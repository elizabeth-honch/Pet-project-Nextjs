import Image from "next/image";
import Link from "next/link";
import styles from './styles.module.css';

export default function ProductItem({ product }) {
  return (
    <li key={product.id}>
      <Image
        width={250}
        height={300}
        src={product.image}
        alt={product.name}
      />
      <div className={styles.info}>
        <p>{product.name}</p>
        <p className={styles.price}>{product.price_str}</p>
        <Link className={styles.link} href={`/products/${product.id}`}>
          Edit
        </Link>
      </div>
    </li>
  );
};
