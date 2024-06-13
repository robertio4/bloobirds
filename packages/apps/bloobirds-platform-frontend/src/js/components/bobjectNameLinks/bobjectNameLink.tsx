import React from 'react';

import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, FIELDS_LOGIC_ROLE, MainBobjectTypes } from "@bloobirds-it/types";

import { useBobjectDetails } from '../../hooks';
import { getTextFromLogicRole } from '../../utils/bobjects.utils';
import styles from '../activitySection/activityItem/activityHeader/activityHeader.module.css';

interface BobjectNameLinkProps {
  bobject: Bobject<MainBobjectTypes>
  icon?: IconType;
  prefix?: string;
  className?: string;
}

export const BobjectNameLink = ({ bobject, prefix, className, icon }: BobjectNameLinkProps) => {
  const bobjectType = bobject?.id?.typeName;
  const bobjectName = getTextFromLogicRole(
    bobject,
    FIELDS_LOGIC_ROLE[bobjectType].NAME,
  );
  const { openBobjectDetails } = useBobjectDetails();

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    openBobjectDetails({
      id: bobject?.id?.value,
      showContactButton: true,
    });
  };
  return bobjectName ? (
    <>
      {prefix && (
        <Text size="s" htmlTag="span">
          {prefix}
        </Text>
      )}
      <span className={styles._link_wrapper_ml} onClick={handleClick}>
        {icon && <Icon name={icon} color="bloobirds" size={20} />}
        <Text size="s" htmlTag="span" color="bloobirds" className={className}>
          {bobjectName}
        </Text>
      </span>
    </>
  ) : null;
};
