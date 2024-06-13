import { useRef, useState, useEffect } from 'react';

import { Actions } from '../../types/messages';
import { normalizeUrl } from '../../utils/url';

export const InjectMessagesScrapperApp = () => {
  const url = normalizeUrl(window.location.href);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(url);
  const countRef = useRef(null);
  countRef.current = count; // Update the boxed value on render
  const [tabHasFocus, setTabHasFocus] = useState(true);

  useEffect(() => {
    const handleFocus = () => {
      console.log('Tab has focus.');
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      console.log('Tab lost focus');
      setTabHasFocus(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (tabHasFocus) {
      setCount(0);
      // startLinkedInMessageSyncing(countRef, setCount); --> OLD
    }
  }, [currentPage, tabHasFocus]);

  useEffect(() => {
    chrome?.runtime?.onMessage.addListener(message => {
      if (message.type === Actions.HistoryUpdate) {
        setTimeout(() => {
          setCurrentPage(normalizeUrl(window.location.href));
        }, 250);
      }
    });
  }, []);

  return <></>;
};
