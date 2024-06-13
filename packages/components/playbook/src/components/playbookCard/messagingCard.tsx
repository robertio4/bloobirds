import React from 'react';
import { useTranslation } from 'react-i18next';

import { ColorType, Button, Icon, Label, Text, Tooltip, useHover } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS, PlaybookTab } from '@bloobirds-it/types';
import { removeHtmlTags } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useIsTemplateOwner } from '../../hooks/useIsTemplateOwner';
import { MessagingCardProps } from '../../types/playbook';
import styles from './playbookCard.module.css';
import { getButtonProps, getTabIcon } from './playbookCard.utils';

interface Props {
  size: 'small' | 'medium';
  uppercase: boolean;
  variant: 'primary' | 'secondary';
  color: ColorType;
}

const standardButtonProps: Props = {
  size: 'small',
  uppercase: false,
  variant: 'secondary',
  color: 'purple',
};

export const MessagingCard = ({
  template,
  onClick,
  tabSelected,
  isSmartEmail,
  buttonProps,
  templateFunctions,
  actionsDisabled,
  sidePeekEnabled,
}: MessagingCardProps) => {
  const [ref, isHovering] = useHover();
  const tabIcon = tabSelected && getTabIcon(tabSelected);
  const lastButtonProps = getButtonProps(tabSelected, actionsDisabled);
  const isPitches = tabSelected === PlaybookTab.PITCHES;
  const isSnippet = tabSelected === PlaybookTab.SNIPPETS;
  const isEmails = tabSelected === PlaybookTab.EMAILS;
  const { t } = useTranslation();
  const isOwner = useIsTemplateOwner(template);

  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
    [styles.containerSmartEmail]: isSmartEmail,
  });

  const cardClasses = clsx(styles.cardText, {
    [styles.cardTextSidePeek]: sidePeekEnabled,
  });

  return (
    <div ref={ref} className={containerClasses} onClick={() => onClick(template)}>
      <div className={cardClasses}>
        {!template?.taskTitle && template?.isOfficial && (
          <div className={styles.official_banner}>
            <Tooltip title={t('playbook.card.officialTemplate')} position="top">
              <Icon name="bookmark_big" color="purple" size={20} />
            </Tooltip>
          </div>
        )}
        <div className={styles.leftIcons_container}>
          {tabIcon && <Icon name={tabIcon} color="lightPurple" size={24} />}
          {(isPitches || isSnippet) && template?.isBattlecard && (
            <Tooltip title={t('playbook.card.battlecard')} position="top">
              <Icon name="battlecards" color="purple" />
            </Tooltip>
          )}
          {isEmails && template?.format === 'HTML' && (
            <Tooltip title={t('playbook.card.html')} position="top">
              <Icon name="coding" color="softPurple" size={16} />
            </Tooltip>
          )}
        </div>
        <div className={styles.templateTextWrapper}>
          {sidePeekEnabled ? (
            <div className={styles.templateText}>
              <Text size="xs" weight="bold">
                {template?.name}
              </Text>
              <Text size="xs">
                <span className={styles.templateBody}>
                  {removeHtmlTags(template?.previewContent)}
                </span>
              </Text>
            </div>
          ) : (
            <Text size="xs" weight="bold">
              <span className={styles.template_name}>
                <div className={styles.template_text}>{template?.name}</div>
                {isEmails && !!template?.taskTitle && (
                  <div className={styles.step_banner}>
                    <Tooltip title={template?.taskTitle} position="top">
                      <Label
                        size={'small'}
                        uppercase={false}
                        color={'verySoftTangerine'}
                        textColor="tangerine"
                        overrideStyle={{
                          ...{
                            paddingLeft: '3px',
                            paddingRight: '3px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                          },
                        }}
                      >
                        {template.taskTitle}
                      </Label>
                    </Tooltip>
                  </div>
                )}
              </span>
              <div className={styles.templateBody}>{removeHtmlTags(template?.previewContent)}</div>
            </Text>
          )}
          {isSnippet && template?.shortcut && (
            <div className={styles.shortcutContainer}>
              <Text size={sidePeekEnabled ? 's' : 'xs'} weight="bold">
                {t('playbook.card.shortcut')}
              </Text>
              <Text
                size={sidePeekEnabled ? 's' : 'xs'}
                color="darkBloobirds"
                className={styles.shortcut}
              >
                /{template?.shortcut}
              </Text>
            </div>
          )}
        </div>
      </div>
      <div className={isSmartEmail ? styles.smartButtonsContainer : styles.buttonsContainer}>
        {template?.format === 'AST' && (
          <Tooltip title={!isOwner && t('playbook.onlyOwner')} position={'top'}>
            <div className={styles.buttonContainer} onClick={e => e.stopPropagation()}>
              <Button
                iconLeft="edit"
                {...(isOwner
                  ? standardButtonProps
                  : { ...standardButtonProps, color: 'softPeanut' })}
                onClick={buttonProps[0]?.onClick}
                disabled={!isOwner}
              >
                {isHovering && t('playbook.card.edit')}
              </Button>
            </div>
          </Tooltip>
        )}
        <Button iconLeft="eye" {...standardButtonProps} {...(isPitches && { variant: 'primary' })}>
          {isHovering && t('playbook.card.view')}
        </Button>
        {!isPitches && !isSmartEmail && (
          <Tooltip
            title={
              (actionsDisabled && t('playbook.permissions')) ||
              (tabSelected === PlaybookTab.WHATSAPP &&
                buttonProps[1]?.disabled &&
                t('playbook.noPhoneNumber'))
            }
            position="top"
          >
            <Button
              {...standardButtonProps}
              variant="primary"
              {...lastButtonProps}
              onClick={buttonProps[1]?.onClick}
              color={actionsDisabled ? undefined : 'purple'}
              {...(tabSelected === PlaybookTab.WHATSAPP && {
                disabled: actionsDisabled || buttonProps[1]?.disabled,
              })}
            >
              {isHovering && lastButtonProps.text}
            </Button>
          </Tooltip>
        )}
        {isSmartEmail && (
          <>
            {isSnippet && (
              <Button
                {...standardButtonProps}
                iconLeft="fileInsert"
                variant={isSnippet ? 'primary' : 'secondary'}
                onClick={e => {
                  e.stopPropagation();
                  mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_SNIPPET_ON_EMAIL_MODAL);
                  templateFunctions.insertTemplate(template);
                }}
              >
                {isHovering && 'Insert'}
              </Button>
            )}
            {!isSnippet && (
              <Button
                {...standardButtonProps}
                /* @ts-ignore */
                iconLeft="sendEmailInvitation"
                variant="primary"
                onClick={e => {
                  e.stopPropagation();
                  mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_TEMPLATE_ON_EMAIL_MODAL);
                  templateFunctions.replaceTemplate(template);
                }}
              >
                {isHovering && t('playbook.card.use')}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
