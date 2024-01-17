import styles from './styles.module.css';
import Link from 'next/link';

export default function Navigation() {
  return (
    <ul className={styles.nav}>
      <li className={styles.rightPosition}>
        <Link href="/" className={styles.navLink}>Home</Link>
      </li>
      <li>
        <Link href="/products" className={styles.navLink}>Products</Link>
      </li>
      <li>
        <Link href="/contacts" className={styles.navLink}>Contacts</Link>
      </li>
    </ul>
  );
};
