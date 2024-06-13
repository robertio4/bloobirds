import React, { useState, useMemo } from 'react';

import { IconButton, TableRow, TableCell, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import { formatDate } from '@bloobirds-it/utils';
import PropTypes from 'prop-types';

import { CRM, CRM_DISPLAY_NAME } from '../../../../constants/integrations';
import { useHover } from '../../../../hooks';
import styles from './customMappingRow.module.css';

const syncRuleText = (rule, displayCrm) => {
  switch (rule) {
    case 'BLOOBIRDS':
      return 'Always use Bloobirds';
    case 'CRM_BUT_BLOOBIRDS_CREATE':
    case 'CRM_BUT_BLOOBIRDS_UPDATE':
    case 'CRM':
      return `Always use ${displayCrm}`;
    case 'BOTH':
      return 'Two-way';
    case 'NO_SYNC':
      return "Don't sync";
    default:
      return "Don't sync";
  }
};
//TODO extract?
function capitalizeFirstLetter([first, ...rest]) {
  return first.toUpperCase() + rest.join('');
}

const CustomMappingRow = ({
  customMap,
  bobjectFields,
  bobjectTypes,
  deleteMapping,
  handleOpen,
  selectedMapping,
  setMap,
  crm,
  crmFields,
}) => {
  const [ref, isHover] = useHover();
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = map => {
    deleteMapping(map);
    setIsDelete(false);
  };

  const bobjectType = useMemo(
    () =>
      bobjectTypes &&
      Object.entries(bobjectTypes)?.filter(type => {
        if (bobjectFields[customMap?.bobjectField]?.bobjectType) {
          return type[1] === bobjectFields[customMap?.bobjectField]?.bobjectType;
        }
        return false;
      })[0],
    [bobjectTypes],
  );

  const displayCrm = CRM_DISPLAY_NAME[crm];

  const salesforceDatamodel = useSalesforceDataModel();
  const [relatedSalesforceEntity] = useMemo(() => {
    if (!salesforceDatamodel || !salesforceDatamodel.types || !customMap.crmIsFromRelatedObject)
      return [];
    return (
      Object.entries(salesforceDatamodel.types ?? {})?.find(([, { fields }]) =>
        fields.find(({ name }) => name === customMap.keyName),
      ) || []
    );
  }, [salesforceDatamodel]);

  const salesforceField = customMap.crmIsFromRelatedObject
    ? salesforceDatamodel?.types[relatedSalesforceEntity]?.fields?.find(
        f => f.name === customMap.keyName,
      )?.label
    : crmFields?.find(f => f.name === customMap.keyName)?.label;

  return (
    <TableRow ref={ref} onClick={() => isDelete && setIsDelete(false)}>
      <TableCell>
        <div className={styles._first_cell}>
          <div style={{ marginRight: '15px' }}>
            {customMap?.fieldName?.length > 15 ? (
              <Tooltip title={customMap.fieldName} position="top" trigger="hover">
                <div>
                  <Text size="s" color="bloobirds" ellipsis={15}>
                    {customMap.fieldName}
                  </Text>
                  <Text size="xs" color="softPeanut">
                    {bobjectType[0] ? bobjectType[0] : ''}
                  </Text>
                </div>
              </Tooltip>
            ) : (
              <>
                <Text size="s" color="bloobirds">
                  {customMap.fieldName}
                </Text>
                <Text size="xs" color="softPeanut">
                  {bobjectType ? bobjectType[0] : ''}
                </Text>
              </>
            )}
          </div>
          <div className={styles._buttons}>
            {isHover && (
              <>
                <div>
                  <IconButton
                    name="edit"
                    onClick={() => {
                      handleOpen(true);
                      setMap(customMap);
                    }}
                  />
                  {isDelete && (
                    <IconButton
                      name="trashFull"
                      color="softTomato"
                      onClick={() => handleDelete(customMap)}
                      uppercase
                    />
                  )}
                  {!isDelete && (
                    <IconButton name="trashFull" onClick={() => setIsDelete(true)} uppercase />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <Text size="s" color="peanut">
            {salesforceField || customMap.keyName}
          </Text>
          <Text size="xs" color="softPeanut">
            {relatedSalesforceEntity
              ? capitalizeFirstLetter(relatedSalesforceEntity)
              : selectedMapping.sobjectType}
          </Text>
        </div>
      </TableCell>
      <TableCell>
        <div className={styles._align_row_text}>
          <Text size="s" color="peanut">
            {syncRuleText(customMap.syncRule, displayCrm)}
          </Text>
        </div>
      </TableCell>
      {crm === CRM.HUBSPOT ? (
        <TableCell>
          <div className={styles._align_row_text}>
            <Text size="s" color="peanut">
              Custom
            </Text>
          </div>
        </TableCell>
      ) : (
        <TableCell>
          <div className={styles._align_row_text}>
            <Text size="s" color="peanut">
              {customMap.maxLength === 0 ? '-' : customMap.maxLength}
            </Text>
          </div>
        </TableCell>
      )}
      <TableCell>
        <div className={styles._align_row_text}>
          <Text size="s" color="peanut">
            {formatDate(new Date(customMap.updateDatetime), 'MMM d, yyyy')}
          </Text>
        </div>
      </TableCell>
      <TableCell>
        <div className={styles._align_row_text}>
          <Text size="s" color="peanut">
            {formatDate(new Date(customMap.creationDatetime), 'MMM d, yyyy')}
          </Text>
        </div>
      </TableCell>
    </TableRow>
  );
};
CustomMappingRow.propTypes = {
  bobjectFields: PropTypes.object,
  bobjectTypes: PropTypes.object,
  customMap: PropTypes.object,
  deleteMapping: PropTypes.func,
  handleOpen: PropTypes.func,
  setMap: PropTypes.func,
};
export default CustomMappingRow;
