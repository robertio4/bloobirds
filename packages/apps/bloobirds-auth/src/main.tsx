import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import AuthRoute from './routes/authRoute/authRoute';
import InvitationRoute from './routes/authRoute/invitationRoute/invitationRoute.tsx';
import LoginRoute from './routes/authRoute/loginRoute/loginRoute';
import RecoverPasswordRoute from './routes/authRoute/recoverPasswordRoute/recoverPasswordRoute.tsx';
import ResetPasswordRoute from './routes/authRoute/resetPasswordRoute/resetPasswordRoute.tsx';
import SignAsRoute from './routes/authRoute/signAsRoute/signAsRoute.tsx';
import ValidateEmailRoute from './routes/authRoute/validateEmailRoute/validateEmailRoute';
import Root from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'auth',
        element: <AuthRoute />,
        children: [
          {
            path: 'login',
            element: <LoginRoute />,
          },
          {
            path: 'signup',
            element: <div />,
          },
          {
            path: 'recoverPassword',
            element: <RecoverPasswordRoute />,
          },
          {
            path: 'resetPassword',
            element: <ResetPasswordRoute />,
          },
          {
            path: 'signAs',
            element: <SignAsRoute />,
          },
          {
            path: 'userInvitation',
            element: <InvitationRoute />,
          },
          {
            path: 'validateEmail',
            element: <ValidateEmailRoute />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="422754750189-pjndacr7mcmrcktemk636kkmgjviq2ms.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
