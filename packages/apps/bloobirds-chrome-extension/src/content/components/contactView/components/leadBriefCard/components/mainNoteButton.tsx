import { useTranslation } from 'react-i18next';

import { ExtendedContextTypes } from '../../../../../../types/extendedContext';
import { api } from '../../../../../../utils/api';
import { isLead, isOpportunity } from '../../../../../../utils/bobjects';
import { useExtensionContext } from '../../../../context';
import { InfoDetailElement } from '../../briefCardComponents/infoDetailElement';

export const MainNoteButton = ({ bobject }) => {
  const { setExtendedContext } = useExtensionContext();
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.bobjectBriefCard' });

  const openNoteModal = (extraInfo = {}) => {
    const isLeadBobject = isLead(bobject);
    const isOpportunityBobject = isOpportunity(bobject);

    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: bobject,
      extraInfo: {
        ...(isLeadBobject
          ? {
              lead: {
                ...bobject,
                fullName: bobject?.fullName,
              },
            }
          : {}),
        ...(isOpportunityBobject
          ? {
              opportunity: {
                ...bobject,
                name: bobject?.name,
              },
            }
          : {}),
        bobjectId: bobject?.id?.value || bobject?.data?.id?.value,
        originallyMainNote: true,
        location: 'bubble',
        ...extraInfo,
      },
    });
  };

  const handleClick = e => {
    e.stopPropagation();

    api
      .get(`/bobjects/${bobject.mainNote}/form`)
      .then(res => {
        const bobjectFieldsData = {};
        res?.data?.fields.forEach(field => {
          bobjectFieldsData[field.logicRole || field.name] = field.value;
        });
        openNoteModal(bobjectFieldsData);
      })
      .catch(openNoteModal);
  };

  return (
    <InfoDetailElement icon="note" iconColor="banana" text={t('note')} onClick={handleClick} />
  );
};
