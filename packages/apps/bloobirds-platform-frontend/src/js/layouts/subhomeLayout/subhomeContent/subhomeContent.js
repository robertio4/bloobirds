import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './subhomeContent.module.css';

const SubhomeContent = ({ banner = null, children }) => {
  const parentRef = useRef();

  return (
    <div
      className={styles._container}
      id="subhomeContent"
      ref={parentRef}
      data-test={'Container-SubhomeContent'}
    >
      {banner}
      <div className={styles._content_wrapper} data-test={'Container-SubhomeContentWrapper'}>
        <div className={styles._content}>{React.cloneElement(children, { parentRef })}</div>
      </div>
    </div>
  );
};

SubhomeContent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SubhomeContent;
