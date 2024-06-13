import React, { useRef } from 'react';

import clsx from 'clsx';

import styles from './contactViewContent.module.css';

export interface ContactViewContentProps {
  ref?: React.RefObject<HTMLDivElement>;
  children?: any;
  onScroll?: (scrollTop: number, canMinimize: boolean, canMaximize: boolean) => void;
  fullWidth?: boolean;
}

export const ContactViewContent = React.forwardRef(
  (props: ContactViewContentProps, ref: React.RefObject<HTMLDivElement>) => {
    const { children, fullWidth, onScroll } = props;
    const lastScrollTop = useRef(0);

    return (
      <div
        ref={ref}
        id="bb-contact-view-content"
        onScroll={() => {
          if (onScroll) {
            const contactEl = document.getElementById('bb-contact-view-content');

            const currentScrollTop = contactEl.scrollTop;
            const isScrollDown = currentScrollTop > lastScrollTop.current;
            const isScrollUp = currentScrollTop < lastScrollTop.current;

            lastScrollTop.current = currentScrollTop;

            // Heights of contactViewHeader + contactViewActions + divider + wizardHelper
            const heightWizardHelper = document.getElementById('bb-wizard-helper')?.clientHeight;

            const heightMinimizedHeader = 62 + 54 + 5 + 80;
            const heightMaximizedHeader = 100 + 54 + 5 + heightWizardHelper;
            const scroll = contactEl.scrollTop;
            const scrollHeight = contactEl.scrollHeight;
            const clientHeight = contactEl.clientHeight;

            const canMinimize =
              heightMaximizedHeader + clientHeight - heightMinimizedHeader < scrollHeight;
            const canMaximize =
              heightMinimizedHeader + clientHeight - heightMaximizedHeader < scrollHeight;

            onScroll(scroll, canMinimize && isScrollDown, canMaximize && isScrollUp);
          }
        }}
        className={clsx(styles.content_container, {
          [styles.content_container_full]: fullWidth,
        })}
      >
        {children}
      </div>
    );
  },
);

ContactViewContent.defaultProps = {
  fullWidth: false,
};
