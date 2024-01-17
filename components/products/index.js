import ProductItem from "./productItem";
import styles from './styles.module.css';

export default function Products({ productsPowder, productsMascara, productsLipstick }) {
  return (
    <div>
      <ul className={styles.list}>
        <h3 className={styles.title}>Powder</h3>
        {productsPowder.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}

        <h3 className={styles.title}>Mascara</h3>
        {productsMascara.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}

        <h3 className={styles.title}>Lipstick</h3>
        {productsLipstick.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
