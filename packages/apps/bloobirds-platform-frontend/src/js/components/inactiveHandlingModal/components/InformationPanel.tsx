import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import { MainBobjectTypes } from '../../../typings/bobjects';
import { INACTIVE_HANDLING_OPTIONS, modalAndActionText } from '../inactiveHandling.constant';
import { useInactiveHandlingModal } from '../useInactiveHandlingModal';
import styles from './informationPanel.module.css';

export const InformationPanel = ({
  selectedOption: { type },
}: {
  selectedOption: { type: INACTIVE_HANDLING_OPTIONS };
}) => {
  const {
    modalState: { bobject },
  } = useInactiveHandlingModal({ type, data: undefined });
  const bobjectType = bobject?.id?.typeName as MainBobjectTypes;
  const modalText =
    type === INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG || type === INACTIVE_HANDLING_OPTIONS.DISCARD
      ? modalAndActionText[bobjectType]?.infoText[type]
      : 'undefined';

  const SelectedOptionInfoDisplay = () => {
    switch (type) {
      case INACTIVE_HANDLING_OPTIONS.BACK_TO_BACKLOG:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              👉 Thinking of starting from scratch?
            </Text>
            <Text size="xs">{modalText}</Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.DISCARD:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              👋 Think you can&apos;t do more?
            </Text>
            <Text size="xs" className={styles._text_block}>
              {modalText}
            </Text>
            <Text size="xs" className={styles._text_block}>
              It&apos;s possible to find it in the lists and subhomes, filtering by
              &quot;Discarded&quot; status.
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.NEW_CADENCE:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              💬 Do you think you should keep insisting?
            </Text>
            <Text size="xs" className={styles._text_block}>
              Enroll it into a new cadence and try to reach out again.
            </Text>
            <Text size="xs" className={styles._text_block}>
              This task will appear in your left bar on the scheduled day.
            </Text>
            <Text size="xs" className={styles._text_block}>
              <a
                href={'https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence'}
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>{' '}
              if you want to know more about cadences
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.NEXT_STEP:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              ✨ Are you sure what to do next?
            </Text>
            <Text size="xs" className={styles._text_block}>
              Create a task so you don&apos;t forget!
            </Text>
            <Text size="xs" className={styles._text_block}>
              This task will appear in your left bar on the scheduled day.
            </Text>
            <Text size="xs" className={styles._text_block}>
              Also, you will be notified if you have{' '}
              <a
                href={'https://support.bloobirds.com/hc/en-us/articles/4861712344860-Reminders'}
                target="_blank"
                rel="noreferrer"
              >
                reminders
              </a>{' '}
              activated.
            </Text>
            <Text size="xs" className={styles._text_block}>
              <a
                href={'https://support.bloobirds.com/hc/en-us/sections/360003357720-Tasks'}
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>{' '}
              if you want to know more about tasks!
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.REASSIGN:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              👉 Do you think it should be worked on by another colleague?
            </Text>
            <Text size="xs">
              Select this option if you think this company or lead should be worked by another
              colleague, for example because its from a target market that does not belong to you.
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.SEND_TO_NURTURING:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              🔄 Do you think not everything is lost?
            </Text>
            <Text size="xs" className={styles._text_block}>
              Nurturing is an active status used to maintain a minimum of contact and/or sharing
              content in order to keep trying to convert a company or lead.
            </Text>{' '}
            <Text size="xs" className={styles._text_block}>
              This task will appear in your left bar on the scheduled day. Remember that{' '}
              <a
                href={' https://support.bloobirds.com/hc/en-us/articles/4821987345308-Cadence'}
                target="_blank"
                rel="noreferrer"
              >
                automated cadences
              </a>{' '}
              are really useful for nurturing!
            </Text>{' '}
            <Text size="xs" className={styles._text_block}>
              <a
                href={'https://support.bloobirds.com/hc/en-us/articles/5856774476188'}
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>{' '}
              to know more about how to improve your nurturing process.
            </Text>
          </>
        );
      case INACTIVE_HANDLING_OPTIONS.ON_HOLD:
        return (
          <>
            <Text size="xs" weight="bold" className={styles._info_header}>
              👉 I don&apos;t want to do anything{' '}
            </Text>
            <Text size="xs">
              Select this option if you think this company or lead should not be discarded nor sent
              to nurture, but rather you expect to do something with it in the future.
            </Text>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles._informationPanel}>
      <SelectedOptionInfoDisplay />
    </div>
  );
};
