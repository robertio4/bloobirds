import React from 'react';
import styles from './rawHTMLBlock.module.css';
import { useSelected } from 'slate-react';
import classNames from 'clsx';

const RawHTMLBlock = ({ children, attributes, element }) => {
  const selected = useSelected();

  const classes = classNames(styles.container, {
    [styles.focused]: selected,
  });

  return (
    <div {...attributes} className={classes}>
      <div contentEditable={false}>
        <div dangerouslySetInnerHTML={{ __html: element.html }} />
      </div>
      {children}
    </div>
  );
};

export default RawHTMLBlock;
