import React from 'react';
import { useLocation } from 'react-router';

import { Button, Checkbox, IconButton, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import { useDataModel, useIsOTOAccount, usePreviousUrl } from '@bloobirds-it/hooks';
import {
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectField,
  BobjectTypes,
  DataModelResponse,
  SALESFORCE_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import { TableRow } from '@material-ui/core';
import clsx from 'clsx';

import { APP_CL_LEADS, bobjectUrl } from '../../../../app/_constants/routes';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useBobjectDetails,
  useBobjectFormVisibility,
  useContextMenu,
  useEntity,
  useRouter,
} from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { usePreviewActivityEmailModal } from '../../../../hooks/usePreviewActivityEmailModal';
import { bobjectModel } from '../../../../misc/model/bobjectFieldsModel';
import { isUrl } from '../../../../misc/utils';
import { api } from '../../../../utils/api';
import { getRelatedBobject, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { DateTextField, NumberTextField, PhoneTextField } from '../../../filter/field/field';
import { BobjectFieldPill } from '../../../filter/field/pill';
import RightClickContextMenu from '../../../rightClickContextMenu';
import { useUserPermissions } from '../../../userPermissions/hooks';
import RowActions from '../../actionsRow/ActionsRow';
import { useTableContext } from '../../context/bobjectTable.context';
import Cell from './Cell';
import styles from './row.module.css';

const NAME_FIELD_LOGIC_ROLE = [
  COMPANY_FIELDS_LOGIC_ROLE.NAME,
  LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
];

const getBobjectUrl = (
  bobjectParam: Bobject,
  bobjectType: { name: BobjectTypes },
  hasSalesEnabled: boolean,
) => {
  const bobjectNeedReference = [
    BobjectTypes.Activity,
    BobjectTypes.Task,
    BobjectTypes.Opportunity,
    BobjectTypes.Lead,
  ];
  const { name: bobjectTypeName } = bobjectType;
  let url;
  let bobject = bobjectParam;

  if (bobjectTypeName && bobjectNeedReference.includes(bobjectTypeName)) {
    let referencedBobject = getRelatedBobject(bobject, BobjectTypes.Company);
    referencedBobject = referencedBobject || getRelatedBobject(bobject, BobjectTypes.Lead);
    referencedBobject = referencedBobject || getRelatedBobject(bobject, BobjectTypes.Opportunity);
    bobject = referencedBobject;
  }
  if (bobject || bobjectParam) {
    const isOpportunity = bobjectTypeName === BobjectTypes.Opportunity;
    const isLead = bobjectTypeName === BobjectTypes.Lead;
    url =
      isOpportunity || isLead
        ? bobjectUrl(bobjectParam, hasSalesEnabled && isOpportunity ? undefined : bobject)
        : bobjectUrl(bobject);
  }
  return url;
};

const onClickRow = (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  history: string[],
  setPreviousUrl: (url: string) => void,
  hasSalesEnabled: boolean,
  {
    bobject,
    bobjectType,
    openEditModal,
    rowClick,
  }: {
    bobject: Bobject;
    bobjectType: { name: BobjectTypes };
    openEditModal: ({ bobject, onSuccess }: { bobject: Bobject; onSuccess?: () => void }) => void;
    rowClick: string;
  },
) => {
  const {
    target: {
      // @ts-ignore
      dataset: { excludeHandler },
    },
  } = event;
  const fieldCompany = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const fieldLead = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const emptyActivity = bobjectType.name === BobjectTypes.Activity && !fieldCompany && !fieldLead;
  if (excludeHandler) {
    event.preventDefault();
    event.stopPropagation();
  } else if (rowClick === 'openForm') {
    event.preventDefault();
    openEditModal({ bobject });
  } else if (!emptyActivity && (event.ctrlKey || event.metaKey)) {
    window.open(getBobjectUrl(bobject, bobjectType, hasSalesEnabled), '_blank');
  } else if (emptyActivity) {
    event.preventDefault();
  } else {
    const url =
      bobject?.id.typeName === BobjectTypes.Lead
        ? `${APP_CL_LEADS}/${bobject?.id.objectId}`
        : getBobjectUrl(bobject, bobjectType, hasSalesEnabled);
    history.push(url);
    document.querySelector('#content').scroll({ top: 0 });
  }
};

const NameField = ({ text, bobject }: { text: string; bobject: Bobject }) => {
  const { openBobjectDetails } = useBobjectDetails();
  return (
    <Tooltip title={text?.length > 33 ? text : ''} position="top">
      <div
        data-test={`TableCell-${bobject?.id.typeName}_Name_${text}`}
        className={styles.nameField}
        data-exclude-handler="name"
        onClick={event => {
          openBobjectDetails({ id: bobject?.id.value, showContactButton: true });
          event.stopPropagation();
          event.preventDefault();
        }}
        style={{ cursor: 'pointer' }}
      >
        {text || `Untitled ${bobject?.id.typeName}`}
      </div>
    </Tooltip>
  );
};

const getField = (
  bobject: Bobject,
  bobjectField: { bobjectType: BobjectTypes; id: string },
  bobjectType: { id?: string; name: BobjectTypes },
  bobjectTypes: { get: (id: string) => { name: BobjectTypes } },
  model: { findById: (arg0: string) => BobjectField },
  bobjectPicklistFieldValues: { get: (arg0: any) => any },
): { isReference: boolean; field: BobjectField } => {
  let field;
  let isReference = false;
  // Case the field belongs to a referenced bobject
  if (bobjectType.id !== bobjectField.bobjectType) {
    const referencedBobject = getRelatedBobject(
      bobject,
      bobjectTypes.get(bobjectField.bobjectType).name,
    );
    // 2. find the field
    if (referencedBobject) {
      field = bobjectModel(referencedBobject).findById(bobjectField.id);
      isReference = true;
    }
  } else {
    // case: the fields belongs to the object itself
    field = model.findById(bobjectField.id);
  }
  if (field === undefined) {
    return { isReference: false, field: undefined };
  }

  if (field && !field.text) {
    const value = bobject?.raw?.contents[field?.name];
    if (value && value !== '') {
      const picklistValue = bobjectPicklistFieldValues.get(value);
      field['text'] = picklistValue?.value;
    }
  }

  return {
    isReference,
    field,
  };
};

const getReferencedBobjectText = (referencedBobjectFields: BobjectField[]) =>
  referencedBobjectFields?.find(
    referencedBobjectField =>
      referencedBobjectField.logicRole === 'COMPANY__NAME' ||
      referencedBobjectField.logicRole === 'LEAD__FULL_NAME' ||
      referencedBobjectField.logicRole === 'OPPORTUNITY__NAME',
  )?.text;

const navigateToAiAnalysisPage = (activity: Bobject, history) => {
  const activityId = activity.id.objectId;
  const activityTypeLogicRole = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole;

  let activityType = '';
  if (activityTypeLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING) {
    activityType = 'meeting';
  } else if (activityTypeLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL) {
    activityType = 'call';
  }

  if (activityType && activityId) {
    const url = `/app/ai-analysis/${activityType}/${activityId}`;
    history.push(url);
  }
};

const display = (
  bobject: Bobject,
  bobjectField: { bobjectType: BobjectTypes; id: string },
  bobjectType: { id?: string; name: BobjectTypes },
  bobjectTypes: { get: (id: string) => { name: BobjectTypes } },
  model: { findById: (arg0: string) => any },
  bobjectPicklistFieldValues: { get: (arg0: any) => any },
  createToast: (params: { message: string; type: 'success' | 'error' }) => void,
  options: { handleOpenModal?: (params: { activity: Bobject }) => void },
  dataModel: DataModelResponse,
  history: string[],
) => {
  const { isReference, field } = getField(
    bobject,
    bobjectField,
    bobjectType,
    bobjectTypes,
    model,
    bobjectPicklistFieldValues,
  );

  if (!field) {
    return null;
  }

  if (field.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.COPILOT_ANALYSIS && field.text) {
    return (
      <Tooltip title="View AI analysis" position="top">
        <Button
          iconLeft="magic"
          variant="IAGradient"
          size="small"
          color="purple"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            navigateToAiAnalysisPage(bobject, history);
          }}
          uppercase={false}
        >
          AI Analysis
        </Button>
      </Tooltip>
    );
  }

  if (
    // @ts-ignore
    field.logicRole === SALESFORCE_LOGIC_ROLES.SALESFORCE_LEAD_STATUS ||
    // @ts-ignore
    field.logicRole === SALESFORCE_LOGIC_ROLES.SALESFORCE_OPPORTUNITY_STAGE ||
    // @ts-ignore
    field.logicRole === SALESFORCE_LOGIC_ROLES.SALESFORCE_COMPANY_STATUS
  ) {
    const sfdcStatusField = dataModel.findFieldByLogicRole(field.logicRole);
    const sfdcStatus = sfdcStatusField?.values?.find(
      status => status.salesforceLabel === field.text,
    );

    if (!sfdcStatus) {
      return null;
    }

    return (
      <BobjectFieldPill
        field={{
          ...field,
          valueBackgroundColor: sfdcStatus?.backgroundColor,
          valueTextColor: sfdcStatus?.textColor,
          valueOutlineColor: sfdcStatus?.outlineColor,
          text: field.text ?? sfdcStatus?.crmStatusLabel,
        }}
      />
    );
  }
  if (field.valueBackgroundColor !== null && field.valueBackgroundColor !== undefined) {
    return <BobjectFieldPill field={field} />;
  }
  if (
    field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY &&
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.valueLogicRole ===
      ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL
  ) {
    const body = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_BODY);
    if (!body) {
      return null;
    }
    return (
      <Tooltip title="Preview email" position="top">
        <Button
          iconLeft="eye"
          variant="secondary"
          size="small"
          color="bloobirds"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (options?.handleOpenModal) {
              options?.handleOpenModal({ activity: bobject });
            }
          }}
        />
      </Tooltip>
    );
  }
  if (field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL) {
    const recordCall = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
    if (!recordCall) {
      return null;
    }
    const getSignedCallRecordingUrl = async () => {
      const oldRecordingRegex = /^(https:\/\/record-calls.bloobirds.com\/)(.{34})/g;
      let callSid = recordCall;
      const itsADeprecatedRecordingLink = recordCall.match(oldRecordingRegex);
      if (!itsADeprecatedRecordingLink && isUrl(recordCall)) {
        return recordCall;
      }
      if (recordCall && itsADeprecatedRecordingLink) {
        callSid = recordCall.split('/').at(-1);
      } else {
        callSid = recordCall.split('/')[1];
      }
      const signedUrl = await api.get(`/calls/whiteLabel/calls/${callSid}/recording`);
      if (signedUrl.status === 200) {
        return signedUrl.data.url;
      } else {
        throw new Error('Failed to get signed url');
      }
    };
    return (
      <IconButton
        name="voicemail"
        size={24}
        color="bloobirds"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          getSignedCallRecordingUrl()
            .then(url => {
              window.open(url, '_blank');
            })
            .catch(() => {
              createToast({
                message: 'Failed to get the recording, it may have been deleted',
                type: 'error',
              });
            });
        }}
      />
    );
  }
  //@ts-ignore fix this when types prs are merged
  if (NAME_FIELD_LOGIC_ROLE.includes(field.logicRole) && !isReference) {
    return (
      <NameField
        text={
          bobjectType.name === BobjectTypes.Opportunity &&
          field.logicRole === 'OPPORTUNITY__COMPANY'
            ? getReferencedBobjectText(field.referencedBobject?.fields)
            : field.text
        }
        bobject={
          bobjectType.name === BobjectTypes.Opportunity &&
          field.logicRole === 'OPPORTUNITY__COMPANY'
            ? getRelatedBobject(bobject, BobjectTypes.Company)
            : bobject
        }
      />
    );
  }
  if (field.type === 'DATE' || field.type === 'DATETIME') {
    return <DateTextField field={field} />;
  }
  if (field.type === 'NUMBER' || field.type === 'DOUBLE') {
    return <NumberTextField field={field} />;
  }
  if (field.type === 'PHONE') {
    return <PhoneTextField field={field} />;
  }
  if (field.type === 'REFERENCE') {
    if (!field.referencedBobject) {
      return '';
    }
    return getReferencedBobjectText(field.referencedBobject.fields);
  }
  return (
    <Tooltip title={field?.text?.length > 33 ? field?.text : ''} position="top">
      <div
        data-test={`TableCell-${bobject?.id.typeName}_${field?.text}`}
        className={styles.standardField}
        data-exclude-handler="name"
      >
        {field.text}
      </div>
    </Tooltip>
  );
};

export const Row = (props: {
  bobject: Bobject;
  bobjectFields: BobjectField[];
  actionsRow: string[];
  bobjectType: { name: BobjectTypes };
  rowClick: string;
  dataTest: string;
}) => {
  const {
    bobject,
    bobjectFields,
    actionsRow,
    bobjectType,
    rowClick,
    dataTest: dataTestRow,
  } = props;
  const bobjectTypes = useBobjectTypes();
  const model = bobjectModel(bobject);
  const { history } = useRouter();
  const {
    ref,
    xPos,
    yPos,
    isContextMenuVisible,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu();
  const { selectFunctions } = useTableContext();
  const { handleOpenModal } = usePreviewActivityEmailModal();
  const { openEditModal } = useBobjectFormVisibility();
  const { setPreviousUrl } = usePreviousUrl();
  const fieldCompany = getValueFromLogicRole(bobject, 'ACTIVITY__COMPANY');
  const fieldLead = getValueFromLogicRole(bobject, 'ACTIVITY__LEAD');
  const emptyActivity = bobjectType.name === BobjectTypes.Activity && !fieldCompany && !fieldLead;
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const hasSalesEnabled = useFullSalesEnabled();
  const { createToast } = useToasts();
  const { selectedItems, selectOneItem } = selectFunctions;
  // TEMPORAL
  const isLists = useLocation()?.pathname.includes('app/cl/');
  const { bulkActions: hasBulkActionsPermission } = useUserPermissions();
  const shouldShowCheckbox = isLists && hasBulkActionsPermission;
  const isChecked = selectedItems?.some(item => item?.id?.objectId === bobject?.id?.objectId);
  const isOTOAccount = useIsOTOAccount();
  const dataModel = useDataModel();

  return (
    <>
      <TableRow
        className={clsx(styles.row, { [styles.row_no_click]: isOTOAccount })}
        onClick={
          isOTOAccount
            ? undefined
            : event =>
                onClickRow(event, history, setPreviousUrl, hasSalesEnabled, {
                  bobject,
                  bobjectType,
                  openEditModal,
                  rowClick,
                })
        }
        onContextMenu={handleContextMenu}
        onMouseDown={event => {
          if (event.button === 1 && !emptyActivity) {
            window.open(getBobjectUrl(bobject, bobjectType, hasSalesEnabled), '_blank');
            event.preventDefault();
          }
        }}
        ref={ref}
      >
        {shouldShowCheckbox && (
          <Cell className={styles.checkbox} dataTest="checkBox-cell">
            <Checkbox
              size={'small'}
              checked={isChecked}
              onClick={(value, event) => {
                event.stopPropagation();
                event.preventDefault();
                selectOneItem(bobject);
              }}
            />
          </Cell>
        )}
        {bobjectTypes &&
          bobjectFields?.map((bobjectField: any, index: number) => {
            const key = bobjectField.name.replace(/(\s)+/, '_').concat(`_${index}`);
            const dataTest = `${dataTestRow}_${bobjectType.name}_${bobjectField.name}`;
            let actions;
            if (actionsRow !== undefined && index === 0) {
              actions = <RowActions bobject={bobject} actionsRow={actionsRow} />;
            }
            return (
              <Cell key={key} actions={actions} dataTest={dataTest}>
                {display(
                  bobject,
                  bobjectField,
                  bobjectType,
                  bobjectTypes as { get: (id: string) => { name: BobjectTypes } },
                  model,
                  bobjectPicklistFieldValues,
                  createToast,
                  {
                    handleOpenModal,
                  },
                  dataModel,
                  history,
                )}
              </Cell>
            );
          })}
        {isContextMenuVisible && !emptyActivity && !isOTOAccount && (
          <RightClickContextMenu
            url={getBobjectUrl(bobject, bobjectType, hasSalesEnabled)}
            xPos={xPos}
            yPos={yPos}
            hideContextMenu={hideContextMenu}
          />
        )}
      </TableRow>
    </>
  );
};
