import Navigation from '../navigation';
import styles from './styles.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
