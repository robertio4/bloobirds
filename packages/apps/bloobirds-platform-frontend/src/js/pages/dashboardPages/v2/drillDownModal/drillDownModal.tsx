import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  lightOrDark,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableFooterRight,
  TableHead,
  TableHeader,
  TableHeaderLeft,
  TableLabel,
  TableRow,
  TableTitle,
  toRgba,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useIsOTOAccount } from '@bloobirds-it/hooks';
import clsx from 'clsx';
import { map } from 'lodash';

import { companyIdUrl, leadUrl, opportunityUrl } from '../../../../app/_constants/routes';
import { DateTextField } from '../../../../components/filter/field/field';
import { BobjectFieldPill } from '../../../../components/filter/field/pill';
import { useEntity } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useNewDrillDownModal } from '../../../../hooks/useNewDrillDownModal';
import styles from '../../v1/drillDownModal/drillDownModal.module.css';

const ColoredPill = (value: string, bobjectFieldId: string) => {
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectFields = useEntity('bobjectFields');

  let picklistValues = bobjectPicklistFieldValues?.filterBy('bobjectField', bobjectFieldId);
  if (picklistValues && picklistValues.length === 0) {
    const globalPicklist = bobjectFields?.findBy('id')(bobjectFieldId)?.bobjectGlobalPicklist;
    picklistValues = bobjectPicklistFieldValues?.filterBy('bobjectGlobalPicklist', globalPicklist);
  }

  const picklistValue = picklistValues?.find(
    (property: { value: string }) => property.value === value,
  );

  if (picklistValue?.backgroundColor) {
    return (
      <BobjectFieldPill
        field={{
          text: value,
          valueBackgroundColor: picklistValue.backgroundColor,
          valueTextColor: picklistValue.textColor,
          valueOutlineColor: picklistValue.outlineColor,
        }}
      />
    );
  }
  return value;
};

const CustomTaskPill = (value: string) => {
  const { customTasks } = useCustomTasks({ disabled: true });
  const customTask = customTasks?.find(ct => ct.name === value);

  if (!customTask) {
    return <></>;
  }

  return (
    <BobjectFieldPill
      field={{
        text: value,
        valueBackgroundColor: toRgba(customTask.iconColor, 1),
        valueTextColor:
          lightOrDark(toRgba(customTask.iconColor, 1)) === 'light' ? '#464f57' : '#ffffff',
      }}
    />
  );
};

const FieldTableCell = ({
  value,
  type,
  bobjectFieldId,
  logicRole,
}: {
  value: string;
  type: string;
  bobjectFieldId: string;
  logicRole: string;
}): JSX.Element | string => {
  if (value === 'null') {
    return null;
  }
  if (logicRole === 'ACTIVITY__CUSTOM_TASK') {
    return CustomTaskPill(value);
  }
  if (type === 'PICKLIST' || type === 'GLOBAL_PICKLIST') {
    return ColoredPill(value, bobjectFieldId);
  }
  if (type === 'DATE' || type === 'DATETIME') {
    const date = new Date(value);
    return <DateTextField field={{ text: date.toISOString() }} />;
  }

  if (type === 'TEXT') {
    return value;
  }

  return value;
};

export const DrillDownModal = () => {
  const {
    drillDownData,
    openDrillDown,
    setOpenDrillDown,
    updateDrillDown,
    resetDrillDownData,
    isFunnel,
    funnelDrillDownData,
    paginateFunnel,
  } = useNewDrillDownModal();

  const hasSalesEnabled = useFullSalesEnabled();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectFields = useEntity('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');
  const { customTasks } = useCustomTasks({ disabled: true });
  const customTaskField = bobjectFields.findByLogicRole('ACTIVITY__CUSTOM_TASK');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const scrollRef = useRef(null);

  const isOTOAccount = useIsOTOAccount();

  useEffect(() => {
    if (isFunnel && !funnelDrillDownData.isFetching) {
      paginateFunnel(rows, rows * page);
    } else if (!isFunnel) {
      updateDrillDown(
        drillDownData.report,
        drillDownData.title,
        drillDownData.localFilters,
        drillDownData.nullField,
        rows,
        rows * page,
        undefined,
      );
    }
  }, [page, rows]);

  const finalData = isFunnel ? funnelDrillDownData : drillDownData;

  if (finalData?.data && finalData?.data?.result.length !== 0) {
    const result = finalData?.data?.result.map(listOfFields =>
      listOfFields.map(column => {
        let bobjectField = bobjectFields.findByLogicRole(column.logicRole);
        const fieldType = bobjectField
          ? fieldTypes.findBy('id')(bobjectField.fieldType)?.enumName
          : undefined;
        const isPicklist =
          bobjectField &&
          fieldType &&
          (fieldType === 'PICKLIST' || fieldType === 'GLOBAL_PICKLIST');
        let picklistValue = bobjectPicklistFieldValues.findBy('id')(column.value);
        if (drillDownData.report === 'ALL_ACTIVITY_OUTGOING' && !picklistValue) {
          const customTask = customTasks?.find(ct => ct.id === column.value);
          if (customTask) {
            // @ts-ignore
            picklistValue = { value: customTask.name };
            bobjectField = customTaskField;
          }
        }
        return {
          bobjectFieldId: bobjectField?.id,
          label: bobjectField?.name,
          value: isPicklist ? (picklistValue ? picklistValue.value : 'No Value') : column.value,
          fieldType: fieldType,
          logicRole: bobjectField.logicRole,
        };
      }),
    );
    const headers = map(
      result[0].filter(column => column.fieldType !== 'REFERENCE'),
      'label',
    );

    const handleClick = (references: { label: string; value: string }[]) => {
      if (references.length > 1) {
        const companyId = references.filter(ref => ref.label === 'Company')[0];
        const opportunityId = references.filter(ref => ref.label.includes('Opportunity'))[0];
        if (companyId && opportunityId) {
          window.open(
            opportunityUrl(hasSalesEnabled ? undefined : companyId.value, opportunityId.value),
          );
        } else if (companyId) {
          window.open(companyIdUrl(companyId.value));
        }
      } else if (references.length === 1) {
        if (references[0].label === 'Company') {
          window.open(companyIdUrl(references[0].value));
        } else if (references[0].label.includes('Lead')) {
          window.open(leadUrl(references[0].value));
        }
      }
    };

    const handleCloseModal = () => {
      setOpenDrillDown(false);
      resetDrillDownData();
    };

    return (
      <Modal open={openDrillDown} width={1300} onClose={handleCloseModal}>
        <ModalHeader>
          <ModalTitle>Drill down</ModalTitle>
          <ModalCloseIcon onClick={handleCloseModal} />
        </ModalHeader>
        <ModalContent>
          <TableContainer>
            <TableHeader>
              <TableHeaderLeft>
                <TableTitle>{finalData?.title}</TableTitle>
                <TableLabel>{finalData?.data.totalMatching} Results</TableLabel>
              </TableHeaderLeft>
            </TableHeader>
            <Table ref={scrollRef} className={styles.table}>
              <TableHead>
                {headers.map(header => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableHead>
              <TableBody>
                {result?.map((columns, index) => (
                  <TableRow
                    key={`row-${index}`}
                    onClick={
                      isOTOAccount
                        ? undefined
                        : () =>
                            handleClick(
                              columns.filter(
                                col =>
                                  col.fieldType === 'REFERENCE' &&
                                  col.value !== 'null' &&
                                  col.value !== 'No Value',
                              ),
                            )
                    }
                    className={clsx({ [styles._no_click]: isOTOAccount })}
                  >
                    {columns.map(({ label, value, fieldType, bobjectFieldId, logicRole }) => {
                      if (fieldType !== 'REFERENCE') {
                        return (
                          <TableCell>
                            {/* @ts-ignore - We should add string as a possible child type */}
                            <FieldTableCell
                              key={label + value}
                              type={fieldType}
                              value={value}
                              bobjectFieldId={bobjectFieldId}
                              logicRole={logicRole}
                            />
                          </TableCell>
                        );
                      }
                      return <></>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TableFooter>
              <TableFooterRight>
                <Pagination
                  rowsPerPageOptions={[10, 15, 25, 50, 100]}
                  page={page}
                  count={finalData?.data.totalMatching}
                  rowsPerPage={rows}
                  onChangePage={pg => {
                    setPage(pg);
                    if (scrollRef) {
                      if (finalData?.data.totalMatching - pg * rows > 10) {
                        scrollRef.current.scrollTo(0, 0);
                      } else {
                        scrollRef.current.scrollTo({ left: 0 });
                      }
                    }
                  }}
                  onChangeRowsPerPage={setRows}
                />
              </TableFooterRight>
            </TableFooter>
          </TableContainer>
        </ModalContent>
        <ModalFooter>
          <Button
            uppercase
            onClick={() => {
              setOpenDrillDown(false);
              resetDrillDownData();
            }}
          >
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  return null;
};
