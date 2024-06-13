import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularBadge,
  ColorType,
  Icon,
  IconType,
  Label,
  Tag,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';
import styles from './documentCard.module.css';
import { useAttachedLinks } from '../../hooks/useAttachedLinks';
import { AttachedLink, ParsedDocumentType } from '@bloobirds-it/types';

const DocumentCard = ({ document }: { document: ParsedDocumentType }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isShowMoreActive, setIsShowMoreActive] = useState<boolean>(false);

  const { uploadAttachedLink, attachedLinks } = useAttachedLinks();

  useEffect(() => {
    setIsAdded(attachedLinks.filter(link => link.link === document.fileLink)?.length > 0);
  }, [attachedLinks]);

  const handleShowMoreClick = () => {
    setIsShowMoreActive(!isShowMoreActive);
  };

  const handleAddClick = () => {
    const linkToAttach = {
      link: document.fileLink,
      title: document.title,
      type: document.type,
    };
    uploadAttachedLink(linkToAttach as AttachedLink);
  };

  return (
    <div
      className={classNames(styles._suggestionCard_container, {
        [styles._suggestionCard_container_column]: isShowMoreActive,
      })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles._left_container}>
        <SuggestionCardMainInfo
          document={document}
          isHovering={isHovering}
          isShowMoreActive={isShowMoreActive}
          handleAddClick={handleAddClick}
          isAdded={isAdded}
        />
      </div>
      <div className={styles._right_container}>
        <SuggestionCardContent document={document} isShowMoreActive={isShowMoreActive} />
        <div className={styles._bottom_buttons}>
          <Button
            className={styles._showMore_button}
            variant="clear"
            size="small"
            color="purple"
            uppercase={false}
            iconRight={isShowMoreActive ? 'chevronUp' : 'chevronDown'}
            onClick={handleShowMoreClick}
          >
            {isShowMoreActive ? 'Show less' : 'Show more'}
          </Button>
          {isShowMoreActive && (
            <Button
              size="small"
              iconLeft={isAdded ? 'check' : 'plus'}
              uppercase={false}
              color={isAdded ? 'extraCall' : 'bloobirds'}
              className={classNames(styles._add_button_large, {
                [styles._add_button_large_visible]: isHovering || isAdded,
                [styles._add_button_no_cursor]: isAdded,
              })}
              onClick={handleAddClick}
            >
              {isAdded ? 'Already added' : 'Add to text'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const SuggestionCardMainInfo = ({
  document,
  isHovering,
  isShowMoreActive,
  handleAddClick,
  isAdded,
}: {
  document: Partial<ParsedDocumentType>;
  isHovering: boolean;
  isShowMoreActive: boolean;
  handleAddClick: () => void;
  isAdded: boolean;
}) => {
  const { icon, iconColor, title, date, link, keywords, visibility, assignedTo } = document;
  const [isShowMoreTagsActive, setIsShowMoreTagsActive] = useState<boolean>(false);

  return (
    <div
      className={classNames(styles._mainInfo_container, {
        [styles._mainInfo_container_row]: isShowMoreActive,
      })}
    >
      <Icon
        name={icon as IconType}
        color={iconColor as ColorType}
        size={24}
        className={styles._icon_container}
      />
      <div
        className={classNames(styles._mainInfo_details_container, {
          [styles._mainInfo_details_container_row]: isShowMoreActive,
        })}
      >
        <div className={styles._mainInfo_details}>
          <Text size="xs" color="peanut">
            {title}
          </Text>
          {link && (
            <Text size="xxs" color="softPeanut" ellipsis={30}>
              {link}
            </Text>
          )}
          {date && (
            <Text size="xxs" color="softPeanut" ellipsis={30}>
              Updated: {date.toDateString()}
            </Text>
          )}
        </div>
        <div className={styles._mainInfo_buttons_container}>
          <div
            style={{
              maxHeight: isShowMoreTagsActive ? undefined : isShowMoreActive ? '60px' : '30px',
              overflow: isShowMoreTagsActive ? undefined : 'hidden',
            }}
          >
            {keywords &&
              keywords.map(keyword => (
                <Tooltip
                  key={keyword.text}
                  title={keyword?.type?.toLocaleUpperCase()}
                  position="top"
                >
                  <Tag uppercase={false} value={keyword.text} key={keyword.text}>
                    {keyword.text}
                  </Tag>
                </Tooltip>
              ))}
          </div>

          {keywords?.length > 4 && (
            <Button
              className={styles._showMore_button}
              variant="clear"
              size="small"
              color="purple"
              uppercase={false}
              iconRight={isShowMoreTagsActive ? 'chevronUp' : 'chevronDown'}
              onClick={() => setIsShowMoreTagsActive(!isShowMoreTagsActive)}
            >
              {isShowMoreTagsActive ? 'Show less' : 'Show all'}
            </Button>
          )}
          {visibility && (
            <Label
              key={visibility}
              icon="lock"
              size="small"
              color="verySoftPurple"
              textColor="purple"
              uppercase={false}
            >
              {visibility}
            </Label>
          )}
          {assignedTo && (
            <TargetMarketBadge
              key={assignedTo}
              value={{ name: 'French Market', color: 'orange', shortname: 'FM' }}
            />
          )}
          {!isShowMoreActive && (
            <Button
              size="small"
              iconLeft={isAdded ? 'check' : 'plus'}
              uppercase={false}
              color={isAdded ? 'extraCall' : 'bloobirds'}
              className={classNames(styles._add_button, {
                [styles._add_button_visible]: isHovering || isAdded,
                [styles._add_button_no_cursor]: isAdded,
              })}
              onClick={handleAddClick}
            >
              {isAdded ? 'Added' : 'Add'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const SuggestionCardContent = ({
  document,
  isShowMoreActive,
}: {
  document: Partial<ParsedDocumentType>;
  isShowMoreActive: boolean;
}) => {
  const { summary, thumbnail } = document;

  return (
    <div className={styles._content_container}>
      {thumbnail && isShowMoreActive && (
        <img
          alt="documentPreview"
          src={`data:image/png;base64,${thumbnail}`}
          style={{ maxWidth: '80px', maxHeight: '80px' }}
        />
      )}
      <Text size="xxs" color="softPeanut" ellipsis={isShowMoreActive ? 1000000 : 100}>
        {summary}
      </Text>
    </div>
  );
};

export default DocumentCard;

export const TargetMarketBadge = ({ value }: { value: any }) => {
  return (
    <Tooltip title={value?.name} position="top">
      <CircularBadge
        size="s"
        color="lightPeanut"
        style={{ color: 'var(--white)', fontSize: '9px' }}
        backgroundColor={value?.color || 'lightPeanut'}
      >
        {value?.shortname}
      </CircularBadge>
    </Tooltip>
  );
};
