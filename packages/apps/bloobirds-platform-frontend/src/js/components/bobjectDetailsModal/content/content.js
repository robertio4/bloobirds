import React, { useEffect, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';

import { Button, Collapsible, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import spacetime from 'spacetime';

import { companyUrl } from '../../../app/_constants/routes';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../constants/opportunity';
import { useBobjectDetailsVisibility, useCadenceControl, useRouter } from '../../../hooks';
import { useCadenceTable } from '../../../hooks/useCadenceTable';
import { useNewCadenceTableEnabled } from '../../../hooks/useFeatureFlags';
import { bobjectFieldsModel } from '../../../misc/model/bobjectFieldsModel';
import { getValueFromLogicRole, isCompany } from '../../../utils/bobjects.utils';
import { WrappedCadenceTable } from '../../cadenceTable/wrappedCadenceTable';
import { getTimetableItems } from '../../timetable/getTimetableItems';
import Timetable from '../../timetable/timetable';
import styles from './content.module.css';
import { FieldIconText, FieldLabelText, FieldTextLabel } from './groupNameFields';
import IntegrationDetailGroup from './integrationDetailGroup';

const noStatusExcludedFields = [
  COMPANY_FIELDS_LOGIC_ROLE.STATUS,
  COMPANY_FIELDS_LOGIC_ROLE.STAGE,
  COMPANY_FIELDS_LOGIC_ROLE.NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.ON_HOLD_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_DISCARDED_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_NURTURING_REASONS,
  COMPANY_FIELDS_LOGIC_ROLE.SALES_ON_HOLD_REASONS,
  LEAD_FIELDS_LOGIC_ROLE.STAGE,
  LEAD_FIELDS_LOGIC_ROLE.STATUS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS,
  'COMPANY__STATUS__CHANGED_DATE_NURTURING',
  'COMPANY__STATUS__CHANGED_DATE_MEETING',
  'LEAD__STATUS__CHANGED_DATE_NURTURING',
  'LEAD__STATUS__CHANGED_DATE_MEETING',
];

const noStatusExcludedSections = ['STATUS DATE'];

const Fields = ({ fieldGroup }) => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  let content = '';
  if (
    fieldGroup.meta.detailDisplay === 'FIELD_LABEL_TEXT' ||
    fieldGroup.meta.detailDisplay === null ||
    fieldGroup.meta.detailDisplay === undefined
  ) {
    content = fieldGroup.fields.map(field => {
      if (isNoStatusAccount && noStatusExcludedFields.includes(field.logicRole)) return null;
      return (
        <div className={styles.fieldsValue} key={`field-${field.name}`}>
          <FieldLabelText field={field} />
        </div>
      );
    });
  } else if (fieldGroup.meta.detailDisplay === 'FIELD_ICON_TEXT') {
    content = fieldGroup.fields.map(field => {
      if (isNoStatusAccount && noStatusExcludedFields.includes(field.logicRole)) return null;
      return (
        <div className={styles.fieldsValue} key={`field-${field.name}`}>
          <FieldIconText fieldGroup={fieldGroup} field={field} />
        </div>
      );
    });
  } else if (fieldGroup.meta.detailDisplay === 'FIELD_BIG_SEAL') {
    content = fieldGroup.fields.map(field => {
      if (isNoStatusAccount && noStatusExcludedFields.includes(field.logicRole)) return null;
      return (
        <React.Fragment key={`field-${field.name}`}>
          <div className={styles.fieldRatingValue}>
            <FieldTextLabel field={field} />
          </div>
        </React.Fragment>
      );
    });
  }
  return <React.Fragment>{content}</React.Fragment>;
};

const ListCollapsable = ({ title, children, isFirst }) => {
  const [collapsed, setCollapsed] = useState(isFirst);
  const handleCollapse = () => setCollapsed(!collapsed);
  return (
    <div className={styles.groupContainer}>
      <Collapsible
        color="softPeanut"
        expanded={collapsed}
        title={title.toLowerCase()}
        onCollapsed={handleCollapse}
        className={styles.collapsableHead}
      >
        <div className={styles.fieldGroupCard}>{children}</div>
      </Collapsible>
    </div>
  );
};

const FieldListCollapsable = ({
  fieldGroup,
  showMoreIsExpanded,
  handleShowMore,
  handleShowLess,
  isFirst,
}) => {
  if (noStatusExcludedSections.includes(fieldGroup.name)) return null;
  return (
    <ListCollapsable title={fieldGroup.name} isFirst={isFirst}>
      <Fields
        fieldGroup={fieldGroup}
        showMoreIsExpanded={showMoreIsExpanded}
        handleShowMore={handleShowMore}
        handleShowLess={handleShowLess}
      />
    </ListCollapsable>
  );
};

const Content = ({ bobject }) => {
  const [showMoreExpanded, setShowMoreExpanded] = useState(false);
  const { history } = useRouter();
  const { openCadenceControl } = useCadenceControl();
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const { cadence: cadenceName, defaultCadence } = useCadenceTable(bobject);
  const model = bobjectFieldsModel(bobject.fields);
  const uncheckedFieldGroups = model.groupFieldsByGroup(bobject.fields);
  const [timetableLoaded, setTimetableLoaded] = useState(false);
  const fieldGroups = uncheckedFieldGroups.map(fieldGroup => ({
    ...fieldGroup,
    fields: fieldGroup.fields.map(field =>
      field.referencedBobject !== undefined
        ? {
            ...field,
            text: field.referencedBobject.fields.find(
              fieldItem =>
                fieldItem.logicRole === COMPANY_FIELDS_LOGIC_ROLE.NAME ||
                fieldItem.logicRole === OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME ||
                fieldItem.logicRole === LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
            )?.text,
          }
        : field,
    ),
  }));

  const bobjectType = bobject?.id.typeName;
  const hasCadence = cadenceName || defaultCadence;
  const hasAssigned = !!getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const isNewCadenceTableEnabled = useNewCadenceTableEnabled();
  const timeTableItems = getTimetableItems('daily');
  const sliderRef = useRef();
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: timeTableItems?.length || 0,
    parentRef: sliderRef,
    estimateSize: React.useCallback(() => 110, []),
    overscan: 3,
  });

  const scrollToDate = date => {
    const dateIndex = timeTableItems.findIndex(item => {
      const [start, end] = item.split('/');
      if (!end) {
        return item === date;
      }
      return spacetime(date).isBetween(spacetime(start), spacetime(end), true);
    });
    columnVirtualizer.scrollToIndex(dateIndex, { align: 'center' });
  };

  useEffect(() => {
    if (timetableLoaded) {
      scrollToDate(spacetime.now().format('iso-short'));
    }
  }, [timetableLoaded]);

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.bodyContainer}>
        <IntegrationDetailGroup bobject={bobject} />
        {isCompany(bobject) && (
          <ListCollapsable isFirst title="CADENCE">
            {hasCadence ? (
              isNewCadenceTableEnabled ? (
                <WrappedCadenceTable bobject={bobject} withoutHeader hideActivityHover />
              ) : (
                <Timetable
                  ref={sliderRef}
                  timeTableItems={timeTableItems}
                  columnVirtualizer={columnVirtualizer}
                  bobject={bobject}
                  offsetDays={-1}
                  isLoaded={() => setTimetableLoaded(true)}
                  onScrollTo={date => {
                    scrollToDate(spacetime(date).format('iso-short'));
                  }}
                />
              )
            ) : (
              <div
                style={{
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <Text size="m" align="center" color="softPeanut">
                  No cadence selected, choose one to start prospecting
                </Text>
                <Tooltip
                  position="top"
                  title={
                    !hasAssigned &&
                    `You can't assign a cadence if the ${bobjectType} is not assigned`
                  }
                >
                  <Button
                    variant="secondary"
                    size="small"
                    dataTest="Cadence-Configure"
                    onClick={() => {
                      const path = companyUrl(bobject);
                      history.push(path);
                      openCadenceControl({ bobjectToSet: bobject, previousStep: false });
                      closeBobjectDetailsModal();
                    }}
                    disabled={!hasAssigned}
                  >
                    CONFIGURE CADENCE
                  </Button>
                </Tooltip>
              </div>
            )}
          </ListCollapsable>
        )}
        {fieldGroups.map((fieldGroup, index) => (
          <FieldListCollapsable
            key={`list-element-${fieldGroup.name}`}
            handleShowMore={() => setShowMoreExpanded(true)}
            handleShowLess={() => setShowMoreExpanded(false)}
            fieldGroup={fieldGroup}
            showMoreIsExpanded={showMoreExpanded}
            isFirst={!isCompany(bobject) && index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
