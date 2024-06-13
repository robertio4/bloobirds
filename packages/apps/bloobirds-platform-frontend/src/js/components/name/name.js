import React from 'react';
import classnames from 'clsx';
import styles from './name.module.css';
import { useBobjectDetails } from '../../hooks';

const Name = ({ bobject, name, isCompleted = false, isContactView = false, className = '' }) => {
  const { openBobjectDetails } = useBobjectDetails();

  return (
    <span
      data-test={`Span-${bobject?.id?.typeName}-${name}`}
      className={classnames(styles._container, className, { [styles._is_complete]: isCompleted })}
      onClick={event => {
        openBobjectDetails({ id: bobject?.id.value, showContactButton: !isContactView });
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {typeof name === 'string' && name}
    </span>
  );
};

export default Name;
