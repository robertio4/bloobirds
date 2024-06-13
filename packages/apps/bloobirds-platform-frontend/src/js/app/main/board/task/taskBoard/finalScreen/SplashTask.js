import React from 'react';
import { useDocumentTitle } from '../../../../../../hooks/useDocumentTitle';
import { BirdsSvg } from '../../../../../../../assets/svg';
import styles from './finalScreen.module.css';
import { QUOTES } from './quotes';

const getQuote = () => {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
};

const SplashTask = ({ title, subtitle, emoji }) => {
  const { text: quote, author } = getQuote();
  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <BirdsSvg />
      </div>
      <span className={styles.titleEmoji} role="img" aria-label="icon-label">
        {emoji}
      </span>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.quote_wrapper}>
        <p className={styles.quote_text}>{quote}</p>
        <p className={styles.quote_author}>- {author}</p>
      </div>
      <p className={styles.paragraph}>
        <span role="img" aria-label="icon-label">
          👈
        </span>{' '}
        {subtitle}
      </p>
    </div>
  );
};

export const SplashNextTask = props => {
  useDocumentTitle('Done!');
  return (
    <SplashTask title="Done!" emoji="🎉" subtitle="Select the next task from the feed" {...props} />
  );
};
