import React from 'react';
import { Route } from 'react-router';
import { APP_CL } from '../../app/_constants/routes';
import ContactPage from './contactPage';

const ContactRoutes = () => {
  const bobjectTypeRegex = '(leads|companies|opportunities)';
  const idRegex = '([a-zA-Z0-9]{16})';
  const contactPath = `${APP_CL}/:type${bobjectTypeRegex}/:id${idRegex}`;

  return (
    <>
      <Route path={contactPath} component={ContactPage} />
    </>
  );
};

export default ContactRoutes;
