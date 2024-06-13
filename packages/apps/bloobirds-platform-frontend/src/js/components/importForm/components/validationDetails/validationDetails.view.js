import React, { useState, useEffect } from 'react';
import { ValidationContent } from '../validationContent/validationContent';
import { useRouter } from '../../../../hooks';
import { APP_CL_IMPORT_HISTORY } from '../../../../app/_constants/routes';
import ImportProgressModalView from '../importProgressModal';
import { useImportForm } from '../../hooks/useImportForm';
import { WebApi } from '../../../../misc/api/web';
import { Spinner } from '@bloobirds-it/flamingo-ui';
import styles from '../upload/upload.module.css';
import { api } from '../../../../utils/api';

const ValidationDetails = () => {
  const {
    bobjectType,
    excelFile,
    action,
    importName,
    startImport,
    startValidation,
    clearImportData,
    uniqueMatchingFileColumn,
    uniqueMatchingField,
    shouldSkipLeadWithoutCompany,
  } = useImportForm();

  const [open, setOpen] = useState(false);
  const { history } = useRouter();
  const [validationResponse, setValidationResponse] = useState(null);
  const [errorsOnMessage, setErrorsOnMessage] = useState(false);
  const [totalObjects, setTotalObjects] = useState(0);

  const stopImport = () => {};

  const closeImportView = () => {
    clearImportData();
    history.push(APP_CL_IMPORT_HISTORY);
  };

  const handleToggle = () => setOpen(!open);
  const handleClose = () => {
    setOpen(false);
    closeImportView();
  };

  const saveImport = () => {
    const urlSearchParams = new URLSearchParams(
      `importName=${encodeURIComponent(importName)}&importAction=${action}&bobjectType=${
        bobjectType.name
      }&totalObjects=${totalObjects}`,
    );

    if (shouldSkipLeadWithoutCompany) {
      urlSearchParams.append('shouldSkipLeadWithoutCompany', 'true');
    }

    if (uniqueMatchingFileColumn) {
      urlSearchParams.append('uniqueMatchingFileColumn', uniqueMatchingFileColumn);
    }

    if (uniqueMatchingField) {
      urlSearchParams.append('uniqueMatchingField', uniqueMatchingField);
    }

    api
      .post(`/bobjects/bulkAction/createImport?${urlSearchParams.toString()}`, excelFile, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        handleToggle(response?.data);
      });
  };

  useEffect(() => {
    if (startImport) {
      saveImport();
      handleToggle();
    }
  }, [startImport]);

  useEffect(() => {
    if (startValidation) {
      api
        .post(
          `/bobjects/bulkAction/validate?importAction=${action}&bobjectType=${bobjectType.name}`,
          excelFile,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        .then(response => {
          const data = response.data;
          const hasErrors = data.filter(msg => msg.type === 'ERROR_REQUIREMENT').length > 0;

          if (hasErrors) {
            setErrorsOnMessage(hasErrors);
          } else {
            const successMessage = data
              .filter(msg => msg.type === 'SUCCESS')
              .map(element => element.message);
            setTotalObjects(successMessage);
          }
          setValidationResponse(data);
        });
    }
  }, [startValidation]);

  return (
    <>
      <div className={styles._root}>
        {validationResponse ? (
          <ValidationContent
            validationMsg={validationResponse}
            hasValidationErrors={errorsOnMessage}
          />
        ) : (
          <>
            <h2 className={styles._title}>Your file is being checked!</h2>
            <p className={styles._subTitle}>
              This process may take a while depending on the size of the file.
            </p>
            <div className={styles._spinner}>
              <Spinner />
            </div>
          </>
        )}
      </div>
      <ImportProgressModalView open={open} close={handleClose} stopImport={stopImport} />
    </>
  );
};

export default ValidationDetails;
