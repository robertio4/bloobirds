import { useMemo, useState } from 'react';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useToasts } from '@bloobirds-it/flamingo-ui';
import { useActiveUserId } from '@bloobirds-it/hooks';
import { checkEmptyText, deserialize, serialize } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BOBJECT_TYPES,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInCompany,
  LinkedInLead,
  MessagesEvents,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, isHtml, createH2, createParagraph } from '@bloobirds-it/utils';
import { PlatePlugin } from '@udecode/plate';
import { TFunction } from 'i18next';
import mixpanel from 'mixpanel-browser';

import { NoteModalProps } from './noteDetail';

const mainNoteField = {
  [BOBJECT_TYPES.COMPANY]: [COMPANY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.LEAD]: [LEAD_FIELDS_LOGIC_ROLE.MAIN_NOTE],
  [BOBJECT_TYPES.OPPORTUNITY]: [OPPORTUNITY_FIELDS_LOGIC_ROLE.MAIN_NOTE],
};

const handleSave = (relatedBobjectType: BobjectTypes, onSave: () => void) => {
  window.dispatchEvent(
    new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: { type: BobjectTypes.Activity },
    }),
  );
  window.dispatchEvent(
    new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
      detail: { type: relatedBobjectType },
    }),
  );
  onSave?.();
};

const getDefaultRelated = (data: NoteModalProps) => {
  const { lead, opportunity, company, related } = data;

  if (related) {
    return related;
  }

  if (lead) {
    return lead?.id?.value;
  }

  if (company) {
    return company?.id?.value;
  }

  if (opportunity) {
    return opportunity?.id?.value;
  }

  return null;
};

const getDefaultName = (data: NoteModalProps) => {
  const { lead, opportunity, company, relatedName } = data;

  if (relatedName) {
    return relatedName;
  }

  if (lead) {
    return lead?.fullName || 'Untitled lead';
  }

  if (company) {
    return company?.name || 'Untitled company';
  }

  if (opportunity) {
    return opportunity?.name || 'Untitled opportunity';
  }

  return null;
};

const getBobjectType = (
  lead: LinkedInLead,
  opportunity: ExtensionBobject,
  company: LinkedInCompany,
) => {
  if (opportunity) return BobjectTypes.Opportunity;
  if (company) return BobjectTypes.Company;
  if (lead) return BobjectTypes.Lead;
  return null;
};

const defaultNewNoteValueTitle = (bobjectName: string, t: TFunction) => [
  {
    type: 'h2',
    children: [
      {
        text: bobjectName ? t('bobjectNote', { bobjectName }) : t('newNote'),
      },
    ],
  },
];

function useNoteData(
  dataModel: DataModelResponse,
  accountId: string,
  data: NoteModalProps,
  plugins: PlatePlugin[],
  titlePlugins: PlatePlugin[],
  getValues: () => FieldValues,
  onSave: () => void,
  onClose: () => void,
  watch: UseFormWatch<FieldValues>,
) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', { keyPrefix: 'notes' });
  const { lead, opportunity, company, bobjectId, originallyMainNote } = data;
  const bobjectType = getBobjectType(lead, opportunity, company);
  const isEditionModal = !!bobjectId;
  const userId = useActiveUserId();

  const getDefaultValues = (dataModel, titlePlugins, defaultName, plugins, data) => {
    const activityMainNoteYes = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES,
    );
    const activityMainNoteNo = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.NO,
    );

    const bobjectTitle = data[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE];
    const bobjectNote = data[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE];

    const getTitle = () => {
      if (bobjectTitle) {
        return typeof bobjectTitle === 'string'
          ? isHtml(bobjectTitle)
            ? deserialize(bobjectTitle, {
                format: 'HTML',
                plugins: titlePlugins,
              })
            : createH2(bobjectTitle)
          : data[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE];
      }

      return defaultNewNoteValueTitle(defaultName, t);
    };

    const getBody = () => {
      if (bobjectNote) {
        return typeof bobjectNote === 'string'
          ? isHtml(bobjectNote)
            ? deserialize(bobjectNote, {
                format: 'HTML',
                plugins: plugins,
              })
            : createParagraph(bobjectNote)
          : data[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE];
      }

      return null;
    };

    const mainNote =
      data[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id ||
      (data[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] &&
        data[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] !== activityMainNoteNo?.id);

    return {
      title: getTitle(),
      body: getBody(),
      mainNote,
    };
  };

  const onSubmit = () => {
    setIsSubmitting(true);
    const { related, ...rest } = getValues();
    const isMainNote = rest[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE];
    const dataToCreate = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE], {
            format: 'AST',
            plugins,
          })
        : null,
      [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]
        ? serialize(rest[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
            format: 'AST',
            plugins,
          })
        : null,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE,
      [ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE]: isMainNote
        ? ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES
        : ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.NO,
      [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: userId,
    };

    let relatedBobjectType: string;
    if (related) {
      if (related?.includes('Lead')) {
        relatedBobjectType = BOBJECT_TYPES.LEAD;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Company')) {
        relatedBobjectType = BOBJECT_TYPES.COMPANY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = null;
      } else if (related?.includes('Opportunity')) {
        relatedBobjectType = BOBJECT_TYPES.OPPORTUNITY;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = related;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = null;
        dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.LEAD] = null;
      }
    }

    const params = { duplicateValidation: true };
    if (!isEditionModal) {
      api
        .post(`/bobjects/${accountId}/Activity`, {
          contents: { ...dataToCreate },
          params,
        })
        .then(activityCreated => {
          setIsSubmitting(false);
          createToast({ message: t('toasts.successCreating'), type: 'success' });
          if (isMainNote && activityCreated?.data) {
            updateMainNoteInRelated(related, relatedBobjectType, activityCreated?.data?.value);
          }
          handleSave(bobjectType, onSave);
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SAVE_ON_NOTE_MODAL);
          onClose();
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    } else {
      api
        .patch(`/bobjects/${bobjectId}/raw`, {
          contents: { ...dataToCreate },
          params,
        })
        .then(() => {
          setIsSubmitting(false);
          createToast({ message: t('toasts.successUpdating'), type: 'success' });

          if (isMainNote) {
            updateMainNoteInRelated(related, relatedBobjectType, bobjectId);
          } else if (originallyMainNote && !isMainNote) {
            updateMainNoteInRelated(related, relatedBobjectType, null);
          }
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_ON_NOTE_MODAL);
          handleSave(bobjectType, onSave);
          onClose();
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };

  const updateMainNoteInRelated = (related: string, relatedBobjectType: string, value?: string) => {
    if (related && relatedBobjectType) {
      api.patch(`/bobjects/${related}/raw`, {
        contents: {
          [mainNoteField[relatedBobjectType]]: value ? [value] : null,
        },
        params: { duplicateValidation: true },
      });
    }
  };

  const bobjectBody = watch(ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const isDirty = useMemo(() => {
    return bobjectBody && (bobjectBody.length > 1 || !checkEmptyText(bobjectBody[0]));
  }, [bobjectBody]);

  const defaultRelated = getDefaultRelated(data);
  const defaultName = getDefaultName(data);

  return {
    isSubmitting,
    onSubmit,
    defaultRelated,
    defaultName,
    isEditionModal,
    isDirty,
    ...getDefaultValues(dataModel, titlePlugins, defaultName, plugins, data),
  };
}

export default useNoteData;
