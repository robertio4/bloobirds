import React, { useState } from 'react';

import { useCadenceSteps } from '@bloobirds-it/cadence';
import {
  Card,
  CardBody,
  CardLeft,
  CardRight,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Text,
  Tooltip,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import { BobjectType, CadenceStep, CadenceStepStatistics, ThreadMode } from '@bloobirds-it/types';
import classNames from 'clsx';
import mixpanel from 'mixpanel-browser';

import { MIXPANEL_EVENTS } from '../../../../../constants/mixpanel';
import useDeleteCadenceStepModal from '../../../../../hooks/useDeleteCadenceStepModal';
import { useQueryParam } from '../../../../../hooks/useQueryParams';
import { numberToOrdinalString } from '../../../../../utils/strings.utils';
import { CreateEditStepModal } from '../../../components/createEditStepModal/createEditStepModal';
import styles from './stepCard.module.css';
import { StepStatisticsModule } from './stepStatistics/stepStatisticsModule';

interface StepCardProps {
  step: CadenceStep;
  bobjectType: BobjectType;
  stepNumber: number;
  refreshCadences: () => void;
}

const AutomatedEmailInfoChips = ({
  mode,
  hasPreviousEmail,
}: {
  mode: ThreadMode;
  hasPreviousEmail: boolean;
}) => (
  <>
    <div className={styles.step_tag}>Automated</div>
    <Tooltip
      title={
        !hasPreviousEmail &&
        'It seems that the first step of this thread has been deleted, check the subject of this email to avoid errors.'
      }
      position="top"
    >
      <div
        className={classNames(styles.step_tag, {
          [styles.step_tag_error]: !hasPreviousEmail && mode !== 'NEW_MESSAGE',
        })}
      >
        {mode === 'NEW_MESSAGE' ? 'New Thread' : 'Reply'}
      </div>
    </Tooltip>
  </>
);

export const StepCard = ({ step, bobjectType, stepNumber, refreshCadences }: StepCardProps) => {
  const {
    actionTypes,
    emailTemplateId,
    suggestedPitch,
    suggestedLinkedinTemplate,
    suggestedWhatsappTemplate,
  } = step;
  const isAutomatedEmail = actionTypes.includes('AUTOMATED_EMAIL');
  const isCustomTask = actionTypes.includes('CUSTOM_TASK');
  const hasTemplate =
    !!emailTemplateId || suggestedPitch || suggestedLinkedinTemplate || suggestedWhatsappTemplate;
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const { ref, visible, setVisible } = useVisible();
  const { createToast } = useToasts();
  const cadenceId = useQueryParam('cadence', true);
  const { cloneStep, steps } = useCadenceSteps(cadenceId);
  const { openModal: openDeleteCadenceStepModal } = useDeleteCadenceStepModal();
  const { statistics: stepStatistics }: { statistics: CadenceStepStatistics } = step;
  const shouldShowStatistics = stepStatistics && isAutomatedEmail;
  const hasPreviuosManualEmail =
    steps.filter(step => step.actionTypes.includes('EMAIL')).length > 0;
  const hasPreviousAutomatedManualEmail =
    steps.filter(step => step.actionTypes.includes('AUTOMATED_EMAIL')).length > 0;

  const { customTasks } = useCustomTasks({ disabled: true });

  const handleCloneStep = async () => {
    await cloneStep(step.id);
    mixpanel.track(MIXPANEL_EVENTS.STEP_CLONED);
    createToast({ message: 'Step cloned successfully!', type: 'success' });
    setVisible(false);
  };

  const handleDeleteStep = async () => {
    openDeleteCadenceStepModal({ id: step?.id });
    setVisible(false);
  };

  const handleEditStep = () => {
    setIsStepModalOpen(true);
    setVisible(false);
  };

  const customTask = step?.customTaskId
    ? customTasks?.find(t => t.id === step.customTaskId)
    : undefined;

  return (
    <div className={styles._card_container}>
      <Card expand>
        <div className={styles._icons_container}>
          {!isAutomatedEmail && !isCustomTask ? (
            <CardLeft>
              {actionTypes.includes('PHONE_CALL') ? (
                <Icon name="phone" color="melon" />
              ) : (
                <Icon name="circle" color="lightPeanut" />
              )}
              {actionTypes.includes('EMAIL') ? (
                <Icon name="mail" color="tangerine" />
              ) : (
                <Icon name="circle" color="lightPeanut" />
              )}
              {actionTypes.includes('LINKEDIN_MESSAGE') ? (
                <Icon name="linkedin" color="darkBloobirds" />
              ) : (
                <Icon name="circle" color="lightPeanut" />
              )}
            </CardLeft>
          ) : (
            <CardLeft>
              {isCustomTask && customTask && (
                <Icon name={customTask?.icon} color={customTask?.iconColor} />
              )}
              {isAutomatedEmail && <Icon name="autoMail" color="tangerine" />}
            </CardLeft>
          )}
        </div>
        <CardBody>
          <div className={styles._card_content_block}>
            <header className={styles._card_content_header}>
              <Text size="m" weight="bold" color="peanut">
                {numberToOrdinalString(stepNumber + 1)} step
                {customTask && (
                  <>
                    {' '}
                    - <strong>{customTask.name}</strong>{' '}
                  </>
                )}
              </Text>
              {hasTemplate && <div className={styles.step_tag}>Template suggested</div>}
              {isAutomatedEmail && (
                <AutomatedEmailInfoChips
                  mode={step.automationEmailThreadMode}
                  hasPreviousEmail={hasPreviuosManualEmail || hasPreviousAutomatedManualEmail}
                />
              )}
            </header>
            <Text className={styles.description} size="s" color="softPeanut" ellipsis={190}>
              {step.description?.replace(/(<([^>]+)>)/gi, '')}
            </Text>
          </div>
        </CardBody>
        <CardRight>
          {shouldShowStatistics && <StepStatisticsModule stepStatistics={stepStatistics} />}
          <Dropdown
            visible={visible}
            anchor={
              <IconButton
                dataTest="Activity-Options"
                name="moreOpenholes"
                color="softPeanut"
                onClick={() => setVisible(!visible)}
              />
            }
          >
            <div ref={ref}>
              <Item icon="edit" onClick={handleEditStep}>
                Edit
              </Item>
              <Item icon="copy" onClick={handleCloneStep}>
                Clone
              </Item>
              <Item icon="trashEmpty" onClick={handleDeleteStep}>
                Delete
              </Item>
            </div>
          </Dropdown>
        </CardRight>
      </Card>
      {isStepModalOpen && (
        <CreateEditStepModal
          id={step?.id}
          bobjectType={bobjectType}
          onClose={() => setIsStepModalOpen(false)}
          refreshCadences={refreshCadences}
        />
      )}
    </div>
  );
};
