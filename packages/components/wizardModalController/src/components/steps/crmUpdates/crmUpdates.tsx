import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AcceptedObject, CrmUpdatesContent, EntityUpdates } from '@bloobirds-it/copilot';
import { Button, ModalContent, ModalFooter, useToasts } from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES, Dictionary } from '@bloobirds-it/types';
import { api, getTextFromLogicRole } from '@bloobirds-it/utils';
import { DefaultWizardsModalParams, useWizardContext } from '@bloobirds-it/wizard-modal-context';
import { useSWRConfig } from 'swr';

import CallInfo from '../../shared/callInfo/callInfo';
import MeetingInfo from '../../shared/meetingInfo/meetingInfo';
import styles from '../notesAndQQ/notesAndQQ.module.css';

export const CrmUpdates = ({
  handleNext,
  buttonsConfig,
  wizardKey,
  handleSkip,
  handleBack,
}: DefaultWizardsModalParams) => {
  const { getWizardProperties } = useWizardContext();
  const { t } = useTranslation();
  const { bobject: activity } = getWizardProperties(wizardKey);
  const { cache, mutate } = useSWRConfig();

  const type = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const hasPreviousStep =
    buttonsConfig?.hasPreviousStep != undefined ? buttonsConfig?.hasPreviousStep : true;
  const [updates, setUpdates] = useState<Dictionary<EntityUpdates>>({});
  const { createToast } = useToasts();
  const acceptedObjects = useMemo(() => {
    return Object.entries(updates).reduce<AcceptedObject[]>((acc, [entity, entityUpdates]) => {
      const aObj = Object.values(entityUpdates.objects)
        .filter(obj => obj.updates.filter(upd => upd.status === 'accepted').length > 0)
        .map<AcceptedObject>(obj => ({
          entityName: entity,
          fields: obj.updates.filter(upd => upd.status === 'accepted'),
          objectName: obj.name,
          objectId: obj.objectId,
        }));

      return [...acc, ...aObj];
    }, []);
  }, [updates]);

  const updateObjects = useCallback(() => {
    if (acceptedObjects.length > 0) {
      return Promise.all(
        acceptedObjects.map(objectUpdate =>
          api.patch(
            `/utils/service/salesforce/sobject/${objectUpdate.entityName}/${objectUpdate.objectId}`,
            objectUpdate.fields.reduce<Dictionary<string>>((acc, field) => {
              acc[field.name] = field.acceptedValue;
              return acc;
            }, {}),
          ),
        ),
      ).then(() => {
        const pattern = new RegExp(`\/utils\/service\/salesforce\/query`);
        const keys = Array.from(cache.keys());
        keys.filter(key => pattern.test(key)).forEach(key => cache.delete(key));
        createToast({
          type: 'success',
          message: 'Objects in Salesforce updated successfully',
        });
      });
    } else {
      return Promise.resolve();
    }
  }, [acceptedObjects]);

  const handleSaveUpdates = useCallback(() => {
    updateObjects().then(handleNext);
  }, [updateObjects]);

  return (
    <>
      <ModalContent>
        {type === ACTIVITY_TYPES.MEETING ? (
          <MeetingInfo activity={activity} />
        ) : (
          <CallInfo activity={activity} />
        )}
        <CrmUpdatesContent activity={activity} onUpdatesChange={setUpdates} />
      </ModalContent>
      <ModalFooter>
        {hasPreviousStep && (
          <Button
            variant="clear"
            onClick={() => {
              handleBack();
            }}
            className={styles.back_button}
          >
            {buttonsConfig?.previousButtonTitle || t('wizards.common.back')}
          </Button>
        )}
        <Button dataTest="Form-Save" onClick={handleSaveUpdates}>
          {buttonsConfig?.nextButtonTitle || t('wizards.common.next')}
        </Button>
      </ModalFooter>
    </>
  );
};
