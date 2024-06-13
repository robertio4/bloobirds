import { ColorType, Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import classNames from 'clsx';

import { useExtensionContext } from '../context';
import styles from './bubbleWindow.module.css';

interface Container {
  children: any;
  className?: string;
  height?: number;
}

interface CircularBadgeProps {
  name: IconType;
  color: ColorType;
  backgroundColor: ColorType;
}

interface CircularBadgeNameProps {
  title: string;
  color: ColorType;
  borderColor: ColorType;
  backgroundColor: string;
  titleColor: ColorType;
}

export const BubbleWindow = ({ children, height }: Container) => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  return (
    <div
      className={styles.window}
      style={{
        height: sidePeekEnabled ? '100%' : height ? `${height}px` : '550px',
      }}
    >
      {children}
    </div>
  );
};

export const BubbleWindowHeader = ({ name, color, backgroundColor }: CircularBadgeProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.horizontalLine} style={{ color: `var(--${color})` }} />
      <div
        className={styles.circularBadge}
        style={{
          color: `var(--${color})`,
          backgroundColor: `var(--${backgroundColor})`,
        }}
      >
        <Icon name={name} color={color} size={32} />
      </div>
    </header>
  );
};

export const BubbleWindowHeaderCircularBadge = ({
  title,
  color,
  borderColor,
  titleColor,
  backgroundColor,
}: CircularBadgeNameProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.horizontalLine} style={{ color: `var(--${color})` }} />
      <div
        className={styles.circularBadge}
        style={{
          color: `var(--${borderColor})`,
          backgroundColor: backgroundColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text color={titleColor} size="l">
          {title}
        </Text>
      </div>
    </header>
  );
};

export const BubbleWindowContent = ({ children, className }: Container) => {
  return <main className={classNames(styles.content, className)}>{children}</main>;
};

export const BubbleWindowFooter = ({ children, className }: Container) => {
  return <footer className={classNames(styles.footer, className)}>{children}</footer>;
};

export const BubbleWindowGradientFooter = ({ children }: Container) => {
  return <footer className={styles.footerGradient}>{children}</footer>;
};
