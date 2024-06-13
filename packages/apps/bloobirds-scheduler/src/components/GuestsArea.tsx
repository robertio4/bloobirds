import { useState, useRef, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AutosizeInput from 'react-input-autosize';

import { Text, Icon } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from '../pages/SelectSlots.module.css';
import { isEmail } from '../utils/email';
import { EmailBadge } from './EmailBadge';

interface GuestsInputProps {
  control: any;
  name: string;
}

const GuestsInput = ({ control, name }: GuestsInputProps) => {
  const inputRef = useRef<AutosizeInput>();
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayPlaceholder, setDisplayPlaceholder] = useState(true);
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler.guests' });

  const {
    field: { value: emailsList, onChange },
    fieldState: { error },
  } = useController({
    defaultValue: [],
    control,
    name,
    rules: {
      validate: values => {
        if (values.length > 0) {
          if (values.length > 10) {
            return t('numberEmailsError');
          }
          const invalidEmails = values.filter(email => !isEmail(email));
          if (invalidEmails.length > 0) {
            return t('invalidEmailsError');
          }
        }
      },
    },
  });

  const handleKeyDown = event => {
    switch (event.key) {
      case ',':
      case ';':
      case ' ':
      case 'Enter':
      case 'Tab':
        event.preventDefault();
        handleEnterOrTabPress();
        break;
      case 'Backspace':
        handleBackspacePress();
        break;
      default:
        break;
    }
  };

  const handleBackspacePress = () => {
    if (emailsList.length > 0 && searchTerm === '') {
      onChange(emailsList.slice(0, emailsList.length - 1));
    }
  };

  const handleEnterOrTabPress = () => {
    const trimmedValue = searchTerm.trim();
    const email = isEmail(trimmedValue) ? trimmedValue : searchTerm;
    if (searchTerm !== '' && emailsList.indexOf(email) === -1 /* && emailsList.length < 10 */) {
      onChange([...emailsList, searchTerm]);
      setSearchTerm('');
    }

    /*     if (value.length > 9) {
      setErrorMsg('You can only add up to 10 guests');
    } */

    if (emailsList.indexOf(email) > -1) {
      setErrorMsg(t('emailAlreadyAdded'));
    }
  };

  const deleteEmail = emailToDelete => {
    onChange(emailsList.filter(email => email !== emailToDelete));
  };

  useEffect(() => {
    setErrorMsg('');
  }, [searchTerm]);

  useEffect(() => {
    if (error) {
      setErrorMsg(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (emailsList.length === 0 && !searchTerm) {
      setDisplayPlaceholder(true);
    }
  }, [emailsList, searchTerm]);

  const classes = clsx(styles.guestsArea, {
    [styles.guestsAreaError]: errorMsg,
  });

  return (
    <>
      <div
        className={classes}
        onClick={() => {
          const input = inputRef.current.getInput();
          input.focus();
        }}
      >
        {emailsList.map((email, index) => (
          <EmailBadge key={email + index} email={email} deleteEmail={deleteEmail} />
        ))}
        <AutosizeInput
          ref={inputRef}
          type="text"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setDisplayPlaceholder(false);
          }}
          onBlur={() => {
            if (emailsList.length === 0 && !searchTerm) {
              setDisplayPlaceholder(true);
            }
            handleEnterOrTabPress();
          }}
          onChange={event => {
            const trimmedValue = event.target.value.trim();
            setSearchTerm(isEmail(trimmedValue) ? trimmedValue : event.target.value);
          }}
        />
        {displayPlaceholder && (
          <div className={styles.placeholder}>
            <Text size="m" color="softPeanut">
              {t('placeholder')}
            </Text>
          </div>
        )}
      </div>
      {errorMsg ? (
        <div className={styles.errorInfo}>
          <Text size="xs" color="tomato">
            {errorMsg}
          </Text>
        </div>
      ) : (
        <div className={styles.inviteesInfo}>
          <Icon size={16} name="alertTriangle" />
          <Text size="xs" color="softPeanut">
            {t('numberEmails')}
          </Text>
        </div>
      )}
    </>
  );
};

export default GuestsInput;
