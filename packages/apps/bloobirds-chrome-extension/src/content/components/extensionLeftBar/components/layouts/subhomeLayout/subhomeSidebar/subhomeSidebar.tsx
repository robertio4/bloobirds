import styles from './subhomeSidebar.module.css';

const SubhomeSidebar = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SubhomeSidebar;
