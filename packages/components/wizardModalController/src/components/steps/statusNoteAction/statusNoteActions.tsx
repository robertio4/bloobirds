import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Button, createToast, ModalContent, ModalFooter, Spinner } from '@bloobirds-it/flamingo-ui';
import { EVENTS } from '@bloobirds-it/wizard-modal-context';

import { NoteColumn } from './components/noteColumn/noteColumn';
import { QuickActionColumn } from './components/quickActionColumn/quickActionColumn';
import { StatusColumn } from './components/statusColumn/statusColumn';
import { StatusNoteActionProvider, useStatusNoteActionContext } from './hooks/useStatusNoteActions';
import styles from './statusNoteActions.module.css';

const withProvider = Component => props => {
  return (
    <StatusNoteActionProvider {...props}>
      <Component />
    </StatusNoteActionProvider>
  );
};
const StatusNoteActionsComponent = () => {
  const {
    handleUpdateStatus,
    loading,
    send,
    t,
    formMethods,
    bobject,
    buttonsConfig,
    setLoading,
  } = useStatusNoteActionContext();

  function handleSubmit(manageTasks) {
    setLoading(true);
    //TODO if more fields are gonna be updated maybe we can move this callback to the context
    handleUpdateStatus(formMethods.getValues())
      .then(response => {
        setLoading(false);
        createToast({
          message: t('toasts.updateSalesforceSuccess'),
          type: 'success',
        });
        if (response === 'noUpdates' && !manageTasks) {
          return send(EVENTS.FINISH);
        }
        if (manageTasks) {
          send(EVENTS.NEXT, { selectedOpportunityObject: bobject, manageTasks: true });
        } else {
          send(EVENTS.FINISH);
        }
      })
      .catch(e => {
        setLoading(false);
        createToast({
          message: t('toasts.updateSalesforceError', {
            error: e?.response?.data?.message ? `: ${e.response.data.message}` : '.',
          }),
          type: 'error',
        });
      });
  }

  return (
    <FormProvider {...formMethods}>
      <ModalContent className={styles.modalContent}>
        <div className={styles.sectionContainer}>
          <StatusColumn />
        </div>
        <div className={styles.sectionSeparator} />
        <div className={styles.sectionContainer}>
          <NoteColumn />
        </div>
        <div className={styles.sectionSeparator} />
        <div className={styles.sectionContainer}>
          <QuickActionColumn />
        </div>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div>
          <Button variant="clear" onClick={() => send(EVENTS.PREVIOUS)} uppercase>
            {t('buttons.back')}
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            onClick={() => handleSubmit(false)}
            uppercase
            variant="secondary"
            className={styles.stepActions_button}
            disabled={loading}
          >
            {loading ? <Spinner name="loadingCircle" size={12} /> : t('buttons.finishReporting')}
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            uppercase
            className={styles.stepActions_button}
            disabled={loading}
          >
            {loading ? (
              <Spinner name="loadingCircle" size={12} />
            ) : (
              buttonsConfig?.nextButtonTitle || t('buttons.manageTasks')
            )}
          </Button>
        </div>
      </ModalFooter>
    </FormProvider>
  );
};

export const StatusNoteActions = withProvider(StatusNoteActionsComponent);
