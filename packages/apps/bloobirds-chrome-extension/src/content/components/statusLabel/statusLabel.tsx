import { Label, Tooltip } from '@bloobirds-it/flamingo-ui';
import classNames from 'classnames';

import styles from './statusLabel.module.css';

export interface StatusLabelProps {
  text: string;
  backgroundColor: string;
  borderColor: string;
  color: string;
  onClick?: () => void;
  size?: 'medium' | 'small';
  className?: string;
}

export const StatusLabel = (props: StatusLabelProps) => {
  if (props?.text?.length > 21) {
    return (
      <Tooltip title={props.text} position="top">
        <StatusLabelContent {...props} />
      </Tooltip>
    );
  }

  return <StatusLabelContent {...props} />;
};

const StatusLabelContent = ({
  text,
  backgroundColor,
  borderColor,
  color,
  onClick,
  size,
  className,
}: StatusLabelProps) => (
  <span
    onClick={e => {
      if (onClick) {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }
    }}
    className={classNames(styles._status__container, className, {
      [styles._status__container__clickable]: !!onClick,
    })}
  >
    <Label
      dataTest={`companyStatus-${text}`}
      size={size}
      overrideStyle={{
        backgroundColor,
        color,
        borderColor,
      }}
      uppercase={size === 'medium'}
    >
      {text}
    </Label>
  </span>
);

StatusLabel.defaultProps = {
  size: 'medium',
};
