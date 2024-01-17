import Layout from "@/components/layout";
import Products from "@/components/products";
import { getProductsByGroup } from "@/lib/products-util";

export default function ProductsPage(props) {
  return (
    <Layout>
      <h1 className="h1">Products</h1>
      <Products {...props} />
    </Layout>
  );
};

export function getStaticProps() {
  const productsPowder = getProductsByGroup('Face powder');
  const productsMascara = getProductsByGroup('Mascara');
  const productsLipstick = getProductsByGroup('Lipstick');
  return {
    props: {
      productsPowder: productsPowder,
      productsMascara: productsMascara,
      productsLipstick: productsLipstick,
    },
  };
};
