import React from 'react';

import { Icon, IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BOUNCED_EMAIL_VALUES_LOGIC_ROLE,
} from '../../../constants/activity';
import { useHover } from '../../../hooks';
import { api } from '../../../utils/api';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../utils/bobjects.utils';
import ActivityBody from './activityBody';
import ActivityHeader from './activityHeader';
import styles from './activityItem.module.css';
import CardStatistics from './cardStatistics';

const Attachments = ({ attachedFiles, betterAttachments }) => {
  try {
    const files = JSON.parse(attachedFiles);
    const betterFiles = betterAttachments && JSON.parse(betterAttachments);
    return (
      <div className={styles.attachments}>
        {betterFiles
          ? betterFiles.map(file => {
              const fileExtension = file.name?.split('.').pop();
              const fileName = file.name?.split('.').shift();
              const fileNameMax30Chars =
                fileName.length > 30 ? `${fileName.substring(0, 30)}...` : fileName;
              return (
                <div className={styles.attachmentLabel} key={file.id}>
                  <Icon name="paperclip" color="softPeanut" size={16} />
                  <Tooltip title={file.name} position="top">
                    <Text
                      inline
                      size="xs"
                      color="softPeanut"
                    >{`${fileNameMax30Chars}.${fileExtension}`}</Text>
                  </Tooltip>
                  {file.url && (
                    <IconButton
                      name="download"
                      size={16}
                      color="bloobirds"
                      onClick={event => {
                        event.stopPropagation();
                        api
                          .get('/messaging/mediaFiles/download', {
                            params: {
                              file_id: file.id,
                            },
                            responseType: 'blob',
                          })
                          .then(res => {
                            const blobUrl = URL.createObjectURL(res.data);
                            const link = document.createElement('a');
                            link.download = file.name;
                            link.href = blobUrl;
                            link.click();
                            link.remove();
                          });
                      }}
                    />
                  )}
                </div>
              );
            })
          : files.map(file => {
              const fileExtension = file.split('.').pop();
              const fileName = file.split('.').shift();
              const fileNameMax30Chars =
                fileName.length > 30 ? `${fileName.substring(0, 30)}...` : fileName;
              return (
                <div className={styles.attachmentLabel} key={file}>
                  <Icon name="paperclip" color="softPeanut" size={16} />
                  <Tooltip title={file} position="top">
                    <Text
                      inline
                      size="xs"
                      color="softPeanut"
                    >{`${fileNameMax30Chars}.${fileExtension}`}</Text>
                  </Tooltip>
                </div>
              );
            })}
      </div>
    );
  } catch (e) {
    return null;
  }
};

const ActivityItem = ({ bobject, showNextLine, pinned }) => {
  const [ref, isHovered] = useHover();
  const containerClasses = classNames(styles._container, {
    [styles._container__pinned]: pinned,
  });
  const attachedFiles = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHED_FILES);
  const betterFiles = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.ATTACHMENTS);
  const type = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const isBouncedEmail =
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.IS_BOUNCED_EMAIL)?.valueLogicRole ===
    BOUNCED_EMAIL_VALUES_LOGIC_ROLE.YES;
  const isIncomingActivity =
    getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION) ===
    ACTIVITY_DIRECTION.INCOMING;

  if (type?.valueLogicRole === 'ACTIVITY__TYPE__CADENCE') {
    const cadenceTitle = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CADENCE_TITLE);
    if (!cadenceTitle) {
      return null;
    }
  }

  const isEmail = type.valueLogicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL;

  return (
    <div ref={ref} className={styles._card_summary}>
      <div className={containerClasses}>
        <div className={styles._main}>
          <ActivityHeader bobject={bobject} hovered={isHovered} />
          <ActivityBody bobject={bobject} />
        </div>
        {!isBouncedEmail && isEmail && (
          <footer className={styles.footer}>
            {!isIncomingActivity && <CardStatistics bobject={bobject} />}
            {attachedFiles && (
              <Attachments attachedFiles={attachedFiles} betterAttachments={betterFiles} />
            )}
          </footer>
        )}
      </div>
      {showNextLine && <div className={styles._dashed_line} />}
    </div>
  );
};

export default ActivityItem;
