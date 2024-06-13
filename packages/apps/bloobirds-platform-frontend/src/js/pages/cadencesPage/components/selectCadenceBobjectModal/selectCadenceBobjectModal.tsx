import React, { useState } from 'react';
import {
  Button,
  Icon,
  IconType,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import classNames from 'classnames';
import styles from './selectCadenceBobjectModal.module.css';
import { BOBJECT_TYPES, BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';

const getBoxDescription = (bobject: MainBobjectTypes) => {
  switch (bobject) {
    case BOBJECT_TYPES.COMPANY:
      return 'If your prospecting model is company-based and the contact is more personalised and manual';
    case BOBJECT_TYPES.LEAD:
      return 'If your prospecting model is lead-based, the emails are in the lead and you want to include auto-emails.';
    case BOBJECT_TYPES.OPPORTUNITY:
      return 'If you want to create a cadence with tasks that will help you close the opportunity';
  }
};

const BobjectLogo = ({
  logo,
  name,
  onChange,
  checked,
}: {
  logo: IconType;
  name: MainBobjectTypes;
  onChange: () => void;
  checked: boolean;
}) => {
  const boxDescription = getBoxDescription(name);
  return (
    <div
      className={classNames(styles._box__container, {
        [styles._box__container__checked]: checked,
      })}
      onClick={() => onChange()}
    >
      <Icon className={styles._logo} name={logo} size={40} color="softBloobirds" />
      <Text size="s" align="center" className={styles._name__container}>
        {name} cadence
      </Text>
      <Text size="xs" className={styles._text__container}>
        {boxDescription}
      </Text>
    </div>
  );
};

export const SetCadenceBobjectView = ({
  bobjectType: cadenceBobjectType,
  setModalBobjectType,
  onClose,
}: {
  bobjectType: string | BobjectTypes | BobjectTypes[];
  setModalBobjectType: any;
  onClose: () => void;
}) => {
  const bobjectTypes = useBobjectTypes();
  const isFullSalesEnabled = useFullSalesEnabled();
  const [bobjectType, setBobjectType] = useState(cadenceBobjectType);
  const company = bobjectTypes?.findBy('name')(BOBJECT_TYPES.COMPANY);
  const lead = bobjectTypes?.findBy('name')(BOBJECT_TYPES.LEAD);
  const opportunity = bobjectTypes?.findBy('name')(BOBJECT_TYPES.OPPORTUNITY);

  return (
    <>
      <ModalHeader size="small" color="veryLightBloobirds">
        <ModalTitle>
          <div className={styles._title__container}>
            <Icon size={24} color="softBloobirds" name="assignBoard" />
            <Text size="m" color="peanut">
              New cadence
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} size="small" color="bloobirds" />
      </ModalHeader>
      <ModalContent>
        <Text size="l" color="peanut">
          What kind of cadence do you want to create?
        </Text>
        <Text size="m" color="softPeanut" inline={true}>
          Choose the type of cadence that helps you the most according to your prospecting model, if
          you want to automate steps, take into account where you store the{' '}
          <b>contact information.</b>
        </Text>
        <div className={styles._bobject_selector_wrapper}>
          <BobjectLogo
            logo="company"
            name={BobjectTypes.Company}
            onChange={() => setBobjectType(company?.id)}
            checked={bobjectType === company?.id}
          />
          <BobjectLogo
            logo="person"
            name={BobjectTypes.Lead}
            onChange={() => setBobjectType(lead?.id)}
            checked={bobjectType === lead?.id}
          />
          {isFullSalesEnabled && (
            <BobjectLogo
              logo="fileOpportunity"
              name={BobjectTypes.Opportunity}
              onChange={() => setBobjectType(opportunity?.id)}
              checked={bobjectType === opportunity?.id}
            />
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose} color="softBloobirds">
          CANCEL
        </Button>
        <Button onClick={() => setModalBobjectType(bobjectType)} color="bloobirds">
          Continue
        </Button>
      </ModalFooter>
    </>
  );
};
