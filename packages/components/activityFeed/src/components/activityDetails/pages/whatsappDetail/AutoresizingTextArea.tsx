import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './AutoresizingTextArea.module.css';

interface AutoResizingTextareaProps {
  hasPermissionToSend: boolean;
  isSending: boolean;
  placeholder?: string;
  setMessage: (message: string) => void;
  defaultMessage?: string;
  resetMessageCounter: number;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({
  hasPermissionToSend,
  isSending,
  placeholder = 'Write a message...', // Default placeholder text
  defaultMessage = '',
  setMessage,
  resetMessageCounter,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [innerDefaultMessage, setInnerDefaultMessage] = useState(() => defaultMessage);
  const [innerMessage, setInnerMessage] = useState(() => defaultMessage);
  const [counter, setCounter] = useState(0);

  const adjustHeight = () => {
    const target = textAreaRef.current;
    if (target) {
      // Reset the height to ensure scrollHeight reflects the current text content accurately
      target.style.height = 'auto';

      // Calculate max height (assuming lineHeight of 20px for each row)
      const maxHeight = 24 * 5; // This could be adjusted based on your CSS or a more precise calculation

      // Update the textarea's height: either to its scrollHeight if less than maxHeight, or to maxHeight
      target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`;

      // Enable or disable scrolling based on content height
      target.style.overflowY = target.scrollHeight > maxHeight ? 'scroll' : 'hidden';
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    setMessage(event.target.value);
    setInnerMessage(event.target.value);
  };

  useEffect(() => {
    if (defaultMessage !== innerDefaultMessage) {
      setInnerDefaultMessage(defaultMessage);
      setMessage(defaultMessage);
      setInnerMessage(defaultMessage);
      if (textAreaRef.current) {
        textAreaRef.current.value = defaultMessage;
      }
      adjustHeight();
      setCounter(c => c + 1);
    }
  }, [defaultMessage]);

  useEffect(() => {
    if (resetMessageCounter > 0 && innerMessage) {
      setInnerMessage('');
    }
  }, [resetMessageCounter]);

  useEffect(() => {
    if (counter > 1) {
      adjustHeight();
      if (textAreaRef.current) {
        const textArea = textAreaRef.current;
        textArea.focus();
        textArea.setSelectionRange(textArea.value.length, textArea.value.length);
      }
    }
  }, [counter]);

  const classes = clsx(styles.box, {
    [styles.disabled]: !hasPermissionToSend || isSending,
    [styles.empty]: !innerMessage || innerMessage === '',
  });

  return (
    <textarea
      className={classes}
      ref={textAreaRef}
      value={innerMessage}
      onChange={handleChange}
      disabled={!hasPermissionToSend || isSending}
      placeholder={placeholder}
      style={{
        width: '100%',
        overflowY: 'hidden', // Initially hide scrollbar until needed
        resize: 'none',
      }}
    />
  );
};

export default AutoResizingTextarea;
