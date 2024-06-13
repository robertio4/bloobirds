import React from 'react';
import LoginForm from './loginForm/loginForm';
import Aside from './aside/aside';
import styles from './loginPage.module.css';

const LoginPage = () => (
  <div className={styles._container}>
    <div className={styles._form_wrapper}>
      <LoginForm />
    </div>
    <div className={styles._aside_wrapper}>
      <Aside />
    </div>
  </div>
);

export default LoginPage;
