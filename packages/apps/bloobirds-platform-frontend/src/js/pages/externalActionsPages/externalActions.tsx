import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import {
  EXTERNAL_ACTION_CONFIRM_INVITATION,
  EXTERNAL_ACTION_REQUEST_RESET_PASSWORD,
  EXTERNAL_ACTION_RESET_PASSWORD,
  EXTERNAL_ACTION_SIGN_AS,
  EXTERNAL_ACTION_VALIDATE_EMAIL,
} from '../../app/_constants/routes';
import { InvitationPage } from './invitation/invitationPage';
import { RecoverPasswordPage } from './recoverPassword/recoverPasswordPage';
import { PasswordResetPage } from './resetPassword/PasswordResetPage';
import { SignAsPage } from './signAs/SignAsPage';
import { ValidateEmailPage } from './validateEmail/ValidateEmailPage';

export const ExternalActions = () => (
  <Router>
    <Route path={EXTERNAL_ACTION_RESET_PASSWORD} component={PasswordResetPage} />
    <Route path={EXTERNAL_ACTION_VALIDATE_EMAIL} component={ValidateEmailPage} />
    <Route path={EXTERNAL_ACTION_REQUEST_RESET_PASSWORD} component={RecoverPasswordPage} />
    <Route path={EXTERNAL_ACTION_CONFIRM_INVITATION} component={InvitationPage} />
    <Route path={EXTERNAL_ACTION_SIGN_AS} component={SignAsPage} />
  </Router>
);
