import { ReactNode } from 'react';
import styles from './inputFeedback.module.css';

export const InputFeedbackList = ({ children }: { children: ReactNode}) => <ul className={styles.list}>{children}</ul>;
