import React, { useEffect, useState } from 'react';
import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { Message, sha512 } from 'js-sha512';
import { parse } from 'query-string';
import { useDocumentTitle } from '../../../hooks';
import { LOGIN } from '../../../app/_constants/routes';
import styles from '../externalActions.module.css';
import InvitationForm from './InvitationForm';
import { JwtApi } from '../../../misc/api/jwt';
import { LogoSvg } from '../../../../assets/svg';

const handleRedirectOnValidation = () => {
  document.location = LOGIN;
};

enum InvitationPageState {
  INITIAL,
  VALIDATING,
  VALIDATED,
  ERROR,
  EXPIRED,
}

function isLoading(state: InvitationPageState) {
  return state !== InvitationPageState.VALIDATED && state !== InvitationPageState.EXPIRED;
}

const InvitationExpired = () => (
  <div className={styles.expiredContainer}>
    <Text htmlTag="h2" size="l">
      The invitation has expired!
    </Text>
    <Text htmlTag="p" size="m">
      Ask your admin to send again the invitation!
    </Text>
    <Button onClick={handleRedirectOnValidation}>Go back to login!</Button>
  </div>
);

const InvitationLoading = () => (
  <div className={styles.expiredContainer}>
    <Text htmlTag="h2" size="l">
      Validating your invitation...
    </Text>
    <Text htmlTag="p" size="m">
      Please wait while we validate your invitation.
    </Text>
    <Spinner size={36} name="dots" />
  </div>
);

export const InvitationPage = () => {
  useDocumentTitle('Confirm invitation');
  const [state, setState] = useState<InvitationPageState>(InvitationPageState.INITIAL);
  const [tokenId, setTokenId] = useState<string>('');
  const [isInvitedUser, setIsInvitedUser] = useState<boolean>(false);

  useEffect(() => {
    if (state === InvitationPageState.INITIAL) {
      setState(InvitationPageState.VALIDATING);
      JwtApi.service.externalAction
        .checkInviteExpiration({ token: parse(window.location.search).token })
        .then(response => {
          setState(InvitationPageState.VALIDATED);
          setTokenId(response.tokenId);
          setIsInvitedUser(response.username === response.email);
        })
        .catch(() => {
          setState(InvitationPageState.EXPIRED);
        });
    }
  }, [state, tokenId]);

  const onSave = async (password: Message, newUsername: string) => {
    const shortNameLetters = newUsername.replace(/[^a-zA-Z ]/g, ' ').split(' ');
    const shortName =
      shortNameLetters.length >= 2
        ? shortNameLetters[0].slice(0, 1).toUpperCase() +
          shortNameLetters[1].slice(0, 1).toUpperCase()
        : shortNameLetters[0].slice(0, 2).toUpperCase();
    try {
      await JwtApi.service.externalAction.confirmInvitation({
        tokenId,
        hashedPass: sha512(password),
        name: newUsername ? newUsername : null,
        shortName: newUsername ? shortName : null,
      });
      handleRedirectOnValidation();
    } catch (e) {
      setState(InvitationPageState.ERROR);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <LogoSvg fill="var(--bloobirds)" width={36} />
          <Text inline>Welcome to bloobirds</Text>
        </div>
        {state === InvitationPageState.EXPIRED && <InvitationExpired />}
        {state === InvitationPageState.VALIDATED && (
          <InvitationForm onSave={onSave} isInvitedUser={isInvitedUser} />
        )}
        {isLoading(state) && <InvitationLoading />}
      </div>
    </div>
  );
};
