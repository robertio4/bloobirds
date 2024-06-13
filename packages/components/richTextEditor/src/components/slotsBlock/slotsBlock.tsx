import React from 'react';

import { useEditorRef } from '@udecode/plate';
import classNames from 'clsx';
import { useSelected } from 'slate-react';

import styles from './slotsBlock.module.css';

const SlotsBlock = ({ children, attributes, element }) => {
  const editor = useEditorRef();
  //@ts-ignore
  const selected = useSelected();

  const classes = classNames(styles.container, {
    [styles.focused]: selected,
  });
  function handleClick() {
    element.onClick();
  }

  return (
    <div {...attributes} className={classes} onClick={handleClick}>
      <div contentEditable={false}>
        <div dangerouslySetInnerHTML={{ __html: element.html }} />
      </div>
      {children}
    </div>
  );
};

export default SlotsBlock;
