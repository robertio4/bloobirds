import { Bobject, BobjectTypes, MessagesEvents } from '@bloobirds-it/types';
import classnames from 'clsx';

import { useExtensionContext } from '../context';
import styles from './name.module.css';

type Props = {
  name: string;
  bobject: Bobject;
  isCompleted?: boolean;
  isContactView?: boolean;
  className?: string;
};

export const Name = ({ bobject, name, isCompleted = false, className = '' }: Props) => {
  const { setContactViewBobjectId, closeExtendedScreen } = useExtensionContext();

  const onCardClick = () => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));

    setContactViewBobjectId(bobject?.id?.value);
    closeExtendedScreen();
  };

  return (
    <span
      data-test={`Span-${bobject?.id?.typeName}-${name}`}
      className={classnames(styles._container, className, { [styles._is_complete]: isCompleted })}
      onClick={event => {
        const bobjectType = bobject?.id?.typeName;
        if (
          bobjectType === BobjectTypes.Lead ||
          bobjectType === BobjectTypes.Company ||
          bobjectType === BobjectTypes.Opportunity
        ) {
          onCardClick();
        }
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {typeof name === 'string' && name}
    </span>
  );
};
