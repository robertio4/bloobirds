import React, { useState } from 'react';
import ReactShadowRoot from 'react-shadow-root';
import styles from './replyHistory.module.css';
import { select } from '@udecode/plate';

const replyStyle = `
  div[dir='ltr'] + blockquote {
    opacity: 0.75;
  }
  div {
    white-space: initial;
  }
`;

const ToggleButton = ({ onClick }) => (
  <button type="button" className={styles.toggle} onClick={onClick}>
    <div>•</div>
    <div>•</div>
    <div>•</div>
  </button>
);

const ReplyHistory = ({ element, attributes, children, editor }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <ToggleButton
          onClick={() => {
            setVisible(!visible);
            setTimeout(() => {
              select(editor, [0, 0]);
            }, 0);
          }}
        />
        {visible && (
          <ReactShadowRoot>
            <style>{replyStyle}</style>
            <div className={styles.history} dangerouslySetInnerHTML={{ __html: element.html }} />
          </ReactShadowRoot>
        )}
      </div>
      {children}
    </div>
  );
};

export default ReplyHistory;
