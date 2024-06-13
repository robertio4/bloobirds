import React, { useEffect } from 'react';
import { Text } from '@bloobirds-it/flamingo-ui';
import { useImportForm } from '../../hooks/useImportForm';
import styles from './validationContent.module.css';
import { ImportAction, ValidationMessage } from '../../types/imports';
import { LeadsCreateOptions } from '../leadsCreateOptions/leadsCreateOptions';
import { BobjectTypes } from "@bloobirds-it/types";

function filterMessagesWhenCompanyMatching(
  showCompanyMatchingOptions: boolean,
  matchingColumn: string,
  message: ValidationMessage,
) {
  return !(
    showCompanyMatchingOptions &&
    (message.message ===
      'To match leads to the correct company the “Company ID” column is required. If you continue without this column, only leads with an email that matches a company website domain will be linked to a company.' ||
      message.message.includes(matchingColumn))
  );
}

export const ValidationContent = ({
  validationMsg,
  hasValidationErrors,
}: {
  validationMsg: ValidationMessage[];
  hasValidationErrors: boolean;
}) => {
  const {
    bobjectType,
    action,
    setCanBeImported,
    showCompanyMatchingOptions,
    setShowCompanyMatchingOptions,
    uniqueMatchingFileColumn,
  } = useImportForm();

  useEffect(() => () => setShowCompanyMatchingOptions(false), []);

  const isCreateAndIsLead =
    bobjectType?.name === BobjectTypes.Lead && action === ImportAction.CREATE;

  const validationErrors = validationMsg
    .filter(msg => msg.type === 'ERROR_REQUIREMENT')
    .map(element => element.message);

  const validationWarnings = validationMsg
    .filter(msg => msg.type === 'ERROR_WARNING')
    .filter(msg =>
      filterMessagesWhenCompanyMatching(showCompanyMatchingOptions, uniqueMatchingFileColumn, msg),
    )
    .map(element => element.message);
  const successMessage = validationMsg
    .filter(msg => msg.type === 'SUCCESS')
    .map(element => element.message);

  if (!hasValidationErrors) {
    setCanBeImported(true);
  }

  const getBobjectNamePlural = (bobjectTypeName: string) => {
    if (bobjectTypeName.slice(-1) === 'y') {
      return `${bobjectTypeName.substring(0, bobjectTypeName.length - 1).toLowerCase()}ies`;
    }
    return `${bobjectTypeName.toLowerCase()}s`;
  };

  const generateActionName = (name: string) => {
    if (name.toLowerCase() === 'create') {
      return 'imported';
    }

    return `${name.toLowerCase()}d`;
  };

  const ErrorH2 = () => (
    <h2 className={styles.title}>Oops! There was an error while we tried to import your file</h2>
  );
  const SuccessH2 = () => (
    <h2 className={styles.title}>Your file was succesfully checked and you are ready to import!</h2>
  );
  const ErrorP = () => (
    <p className={styles.subTitle}>
      Make sure that your Excel spreadsheet meets the{' '}
      <a
        className={styles.uploadLink}
        href={
          'https://support.bloobirds.com/hc/en-us/articles/360011329800-How-to-prepare-your-data-to-be-imported'
        }
      >
        following requirements
      </a>
    </p>
  );
  const SuccessP = () => (
    <p className={styles.subTitle}>
      Please bear in mind that completing the import might take a while.
    </p>
  );

  const messageLabel = (className: string, msg: string) => (
    <div className={className}>
      <Text size="s">{msg}</Text>
    </div>
  );

  return (
    <div className={styles._container}>
      {hasValidationErrors ? <ErrorH2 /> : <SuccessH2 />}
      {hasValidationErrors ? <ErrorP /> : <SuccessP />}
      {isCreateAndIsLead && !hasValidationErrors && <LeadsCreateOptions />}
      <div className={styles.divScrollable}>
        {validationErrors.length === 0 &&
          messageLabel(
            styles.logSuccess,
            `${`${successMessage} ${getBobjectNamePlural(
              bobjectType.name,
            )}`} will be ${generateActionName(action)}`,
          )}
        {validationErrors.length > 0 &&
          validationErrors.map(msg => messageLabel(styles.logError, msg))}
        {validationWarnings.length > 0 &&
          validationWarnings.map(msg => messageLabel(styles.logWarning, msg))}
      </div>
    </div>
  );
};
