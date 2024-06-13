import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactShadowRoot from 'react-shadow-root';

import {
  Button,
  CircularBadge,
  Icon,
  IconButton,
  Label,
  Text,
  Tooltip,
  useHover,
} from '@bloobirds-it/flamingo-ui';
import { TEMPLATE_TYPES, TEMPLATE_TYPES_ICONS } from '@bloobirds-it/types';
import classnames from 'clsx';

import { useActiveUser, useEntity } from '../../../hooks';
import { useIsAccountAdmin } from '../../../hooks/usePermissions';
import { switchDateFormat } from '../../../misc/utils';
import styles from './messagingTemplateCard.module.css';
import Metric from './metric';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MessagingTemplateCard = ({
  enabled = true,
  lastUpdated,
  onClone,
  onCopy,
  onEdit,
  format,
  template,
  templateBody,
  templateName,
  templateSubject,
  templateType,
  templateStatistics,
  type,
  actions,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isCardOverflown, setIsCardOverflown] = useState(false);
  const users = useEntity('users');
  const { activeUser } = useActiveUser();
  const isAdmin = useIsAccountAdmin();
  const author = users?.all()?.find(user => user?.id === template?.createdBy);

  const cardRef = useRef(null);
  const bodyRef = useRef(null);
  const [ref, hovered] = useHover();

  useLayoutEffect(() => {
    setTimeout(() => {
      if (cardRef.current) {
        const { scrollHeight } = cardRef.current;
        if (scrollHeight > 70 || bodyRef.current > 70) {
          setIsCardOverflown(true);
        }
      }
    }, 100);
  }, [cardRef]);

  const isTheOwner = activeUser.id === template?.createdBy || !template?.createdBy || isAdmin;

  return (
    <div ref={ref} className={styles._container}>
      {template?.isOfficial && (
        <div className={styles.official_banner}>
          <Icon name="bookmark_big" color="purple" />
        </div>
      )}
      <div className={styles._icon__container}>
        <Icon name={TEMPLATE_TYPES_ICONS[templateType]} color="softPeanut" />
      </div>
      <div className={styles._metadata__container}>
        <Text
          className={classnames({ [styles.disabled]: !enabled })}
          color={enabled ? 'peanut' : 'softPeanut'}
          weight="medium"
          size="m"
        >
          {templateName || templateBody}
          {!enabled && (
            <Label size="small" overrideStyle={{ marginLeft: 8 }}>
              Disabled
            </Label>
          )}
        </Text>
        {templateType === TEMPLATE_TYPES.QUALIFYING_QUESTION && (
          <Text size="xs" color="softPeanut">
            Last update {switchDateFormat(lastUpdated)}
          </Text>
        )}
        <div className={styles._labels__container}>
          {templateType === TEMPLATE_TYPES.EMAIL && template?.cadenceUsages > 0 && (
            <Label
              size="small"
              color="verySoftPurple"
              textColor="purple"
              uppercase={false}
              overrideStyle={{ maxWidth: '142px', letterSpacing: 0.5 }}
            >
              Used in {template.cadenceUsages} cadences
            </Label>
          )}
          <Label
            size="small"
            color="verySoftPurple"
            textColor="purple"
            uppercase={false}
            overrideStyle={{ maxWidth: '142px', letterSpacing: 0.5, whiteSpace: 'nowrap' }}
          >
            {format === 'HTML' ? 'HTML' : 'Rich Text'}
          </Label>
          {template?.visibility && (
            <Label
              size="small"
              color="verySoftPurple"
              textColor="purple"
              uppercase={false}
              overrideStyle={{ maxWidth: '142px', letterSpacing: 0.5 }}
            >
              <span className={styles._visibility_label}>
                <Icon
                  name={template?.visibility === 'PUBLIC' ? 'unlock' : 'lock'}
                  color="lightPurple"
                  size={12}
                  className={styles._lock__icon}
                />
                {capitalizeFirstLetter(template?.visibility.toLowerCase())}
              </span>
            </Label>
          )}
          {author && (
            <div className={styles._assigned_to}>
              <Tooltip title={`Author: ${author?.name}`} position="top">
                <CircularBadge
                  size="s"
                  color="lightPeanut"
                  style={{ color: 'var(--white)', fontSize: '9px' }}
                  backgroundColor={author?.color || 'lightPeanut'}
                >
                  {author?.shortname || 'U'}
                </CircularBadge>
              </Tooltip>
            </div>
          )}
          {template?.isBattlecard && (
            <Tooltip title="Battlecard" position="top">
              <Icon name="battlecards" color="purple" />
            </Tooltip>
          )}
        </div>
        {templateType === TEMPLATE_TYPES.EMAIL &&
          templateStatistics &&
          Object.keys(templateStatistics).length !== 0 && (
            <div className={styles._statistics_container}>
              <Metric name="USED_COUNT" value={templateStatistics.USED_COUNT} />
              <Metric name="OPENED_RATE" value={templateStatistics.OPENED_RATE} />
              <Metric name="CLICKED_RATE" value={templateStatistics.CLICKED_RATE} />
              <Metric name="REPLIED_RATE" value={templateStatistics.REPLIED_RATE} />
            </div>
          )}
      </div>
      {templateType !== TEMPLATE_TYPES.QUALIFYING_QUESTION && (
        <div className={styles._body__container}>
          <div
            className={classnames(styles._body__box, {
              [styles._body__box_without_overflow]: showMore,
              [styles._body__box_with_overflow]: isCardOverflown ? !showMore : false,
            })}
            ref={cardRef}
          >
            {templateType === TEMPLATE_TYPES.EMAIL && (
              <div
                className={styles._template_subject}
                dangerouslySetInnerHTML={{ __html: templateSubject }}
              />
            )}
            <div>
              <ReactShadowRoot>
                <div
                  ref={bodyRef}
                  className={styles._template_body}
                  dangerouslySetInnerHTML={{ __html: templateBody }}
                />
              </ReactShadowRoot>
            </div>
          </div>
          <div className={styles._body__footer}>
            {isCardOverflown && (
              <Button
                iconRight={showMore ? 'chevronUp' : 'chevronDown'}
                variant="clear"
                uppercase={false}
                onClick={() => setShowMore(!showMore)}
              >
                Show {!showMore ? 'more' : 'less'}
              </Button>
            )}
            <Text size="xs" color="softPeanut" weight="regular" className={styles.lastUpdate}>
              Last update {switchDateFormat(lastUpdated)}
            </Text>
            {template?.mediaFiles?.length > 0 && (
              <div className={styles.attachments}>
                {template.mediaFiles.map(attachment => {
                  const fileExtension = attachment.name.split('.').pop();
                  const fileName = attachment.name.split('.').shift();
                  const fileNameMax30Chars =
                    fileName.length > 30 ? `${fileName.substring(0, 30)}...` : fileName;
                  return (
                    <div
                      className={styles.attachmentLabel}
                      onClick={() => window.open(attachment?.url, '_blank')}
                      key={attachment?.id}
                    >
                      <Icon name="paperclip" color="softPeanut" size={16} />
                      <Tooltip title={attachment?.name} position="top">
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
            )}
          </div>
        </div>
      )}
      {/* type === 'TEMPLATE_MANAGEMENT' && (
        <div className={styles._templateActions__container}>
          <div className={styles._switchText__container}>
            <Text size="s" inline color="bloobirds">
              Enabled
            </Text>
          </div>
          <Switch checked={isEnabled} onChange={toggleIsEnabled} />
        </div>
      ) */}
      <div className={styles._actions__container}>
        <Tooltip title="Clone" position="top">
          <IconButton name="clone" onClick={onClone} color="purple" />
        </Tooltip>
        {type === 'CONTACT_VIEW' && (
          <Tooltip title="Copy" position="top">
            <IconButton name="copy" onClick={onCopy} color="purple" />
          </Tooltip>
        )}
        <Tooltip
          title={
            !isTheOwner
              ? 'Only the owner can edit this template, you can clone it and make any changes you want in a new variant.'
              : 'Edit'
          }
          position="top"
        >
          <IconButton
            disabled={!isTheOwner}
            name="edit"
            onClick={onEdit}
            color={isTheOwner ? 'purple' : 'verySoftPeanut'}
          />
        </Tooltip>
        {type === 'CONTACT_VIEW' && hovered && actions}
      </div>
    </div>
  );
};

export default MessagingTemplateCard;
