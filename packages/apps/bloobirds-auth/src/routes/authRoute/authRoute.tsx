import { Outlet } from 'react-router-dom';

import triangleBlue from '../../assets/triangle-blue.svg';
import triangle from '../../assets/triangle.svg';
import styles from './authRoute.module.css';

const AuthRoute = () => {
  return (
    <div className={styles.authPageContent}>
      <div className={styles.formColumn}>
        <Outlet />
      </div>
      <div className={styles.asideColumn}>
        <div className={styles.asideContent}>
          <h1 className={styles.asideTitle}>
            Make your <b className={styles.asideTitleCallout}>CRM investment worth it</b>
          </h1>
          <p className={styles.asideText}>
            Bloobirds’ platform adds sales and productivity tools to increase CRM adoption and
            engagement while driving more revenue.
          </p>
          <a href="https://www.bloobirds.com" className={styles.asideLink}>
            Visit our website
          </a>
        </div>
      </div>
      <img src={triangle} alt="triangle_decoration" className={styles.triangleDecoration} />
      <img src={triangleBlue} alt="triangle_decoration" className={styles.triangleBlueDecoration} />
    </div>
  );
};

export default AuthRoute;
