import React from 'react';
import classnames from 'clsx';
import TextWithEllipsis from '../../../../components/textWithEllipsis';
import { useBobjectDetails } from '../../../../hooks';
import styles from './name.module.css';

/**
 * @deprecated use nameComponent instead
 */

const Name = ({ bobject, name, isCompleted, ellipsis = 16 }) => {
  const { openBobjectDetails } = useBobjectDetails();

  return (
    <span
      data-test={`Span-${bobject?.id.typeName}-${name}`}
      className={classnames(styles._container, { [styles._is_complete]: isCompleted })}
      onClick={event => {
        openBobjectDetails({ id: bobject?.id.value, showContactButton: true });
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <TextWithEllipsis numChars={ellipsis}>{name}</TextWithEllipsis>
    </span>
  );
};

export default Name;
