import React, { useState } from 'react';

import {
  Icon,
  IconType,
  ColorType,
  Text,
  Select,
  Item,
  Tooltip,
  MultiSelect,
  CheckItem,
} from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { HomepageBlocks } from '../../pages/homePage/typings/home';
import styles from './contentBlock.module.css';

interface SelectorOption {
  id: string;
  value: string;
}

interface ContentBlockProps {
  title: string;
  draggable?: boolean;
  iconName?: IconType;
  iconColor?: ColorType;
  minHeight?: string;
  children: any;
  filter?: {
    placeholder?: string;
    options: SelectorOption[];
    mixpanelEventName?: keyof typeof MIXPANEL_EVENTS;
  };
  secondaryFilter?: { placeholder?: string; options: SelectorOption[] };
  onChange?: (blockEnum: string, value: string) => void;
  defaultFilterValue?: string;
  defaultSecondaryFilterValue?: string;
  blockEnum?: string;
  helperText?: string;
  rightContent?: any;
  titleExtra?: any;
}

export const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(
  (
    {
      children,
      title,
      titleExtra,
      iconName,
      iconColor,
      minHeight,
      filter,
      secondaryFilter,
      defaultFilterValue,
      defaultSecondaryFilterValue,
      onChange,
      draggable,
      blockEnum,
      helperText,
      rightContent,
      ...props
    },
    ref,
  ) => {
    const defaultValue = filter?.options
      ?.filter(x => x)
      ?.find(option => option.id === defaultFilterValue);
    const defaultSecondaryValue = secondaryFilter?.options
      ?.filter(x => x)
      ?.find(option => option.id === defaultSecondaryFilterValue);
    const [filterValue, setFilterValue] = useState<string>(defaultValue?.id);
    const [secondaryFilterValue, setSecondaryFilterValue] = useState<string>(
      defaultSecondaryValue?.id,
    );

    return (
      <div className={styles.container} ref={ref} {...props}>
        <div className={styles.title}>
          <div className={styles.title_text_container}>
            {iconName && (
              <Icon className={styles.icon} name={iconName} color={iconColor} size={16} />
            )}
            {title && (
              <Text size="s" color="softPeanut" className={styles.title_text}>
                {title}
              </Text>
            )}
            {titleExtra && <div>{titleExtra}</div>}
            {helperText && (
              <Tooltip title={helperText} position="top">
                <Icon name="info" color="bloobirds" size={16} />
              </Tooltip>
            )}
          </div>
          <div className={styles.selector_container}>
            {rightContent &&
              React.cloneElement(
                rightContent,
                typeof children === 'string'
                  ? {}
                  : { selectedValue: filterValue || defaultValue?.id },
              )}
            {secondaryFilter && (
              <BlockFilter
                filter={secondaryFilter}
                defaultValue={defaultSecondaryValue}
                value={secondaryFilterValue}
                setValue={setSecondaryFilterValue}
                multiSelect={[HomepageBlocks.MEETINGS, HomepageBlocks.TEAM_MEETINGS].includes(
                  blockEnum as HomepageBlocks,
                )}
                {...{ blockEnum, onChange }}
              />
            )}
            {filter && (
              <BlockFilter
                value={filterValue}
                setValue={setFilterValue}
                multiSelect={[HomepageBlocks.MEETINGS, HomepageBlocks.TEAM_MEETINGS].includes(
                  blockEnum as HomepageBlocks,
                )}
                {...{ filter, blockEnum, onChange, defaultValue }}
              />
            )}
            {draggable && <Icon name="dragAndDrop" size={20} color="softPeanut" />}
          </div>
        </div>
        <div className={styles.content} style={{ minHeight: minHeight || '36px' }}>
          {React.cloneElement(
            children,
            typeof children === 'string'
              ? {}
              : {
                  selectedValue: filterValue || defaultValue?.id,
                  secondarySelectedValue: secondaryFilterValue,
                },
          )}
        </div>
      </div>
    );
  },
);

const BlockFilter = ({
  filter,
  defaultValue,
  value,
  setValue,
  onChange,
  blockEnum,
  multiSelect = false,
}: {
  filter: {
    placeholder?: string;
    options: SelectorOption[];
    mixpanelEventName?: keyof typeof MIXPANEL_EVENTS;
  };
  defaultValue: SelectorOption;
  value: string;
  setValue: (value: string) => void;
  onChange: (blockEnum: string, value: string) => void;
  blockEnum: string;
  multiSelect?: boolean;
}) => {
  const { placeholder, options, mixpanelEventName } = filter || {};
  return multiSelect ? (
    <MultiSelect
      size="small"
      onChange={value => {
        setValue(value);
        onChange?.(blockEnum, value);
        if (mixpanelEventName) {
          mixpanel.track(MIXPANEL_EVENTS[mixpanelEventName as keyof typeof MIXPANEL_EVENTS]);
        }
      }}
      value={value || defaultValue?.id}
      className={styles.selector}
      placeholder={placeholder}
      width="124px"
      selectAllOption
    >
      {options
        ?.filter(option => option)
        ?.map((option: { id: string; value: string }) => (
          <CheckItem value={option?.id} key={option?.id} label={option?.value}>
            {option?.value}
          </CheckItem>
        ))}
    </MultiSelect>
  ) : (
    <Select
      size="small"
      onChange={value => {
        setValue(value);
        onChange?.(blockEnum, value);
        if (mixpanelEventName) {
          mixpanel.track(MIXPANEL_EVENTS[mixpanelEventName as keyof typeof MIXPANEL_EVENTS]);
        }
      }}
      value={value || defaultValue?.id}
      className={styles.selector}
      placeholder={placeholder}
      width="124px"
    >
      {options
        ?.filter(option => option)
        ?.map((option: { id: string; value: string }) => (
          <Item value={option?.id} key={option?.id}>
            {option?.value}
          </Item>
        ))}
    </Select>
  );
};

ContentBlock.defaultProps = {
  draggable: true,
};
