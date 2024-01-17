import Layout from "@/components/layout";
import ProductInfo from "@/components/products/productInfo";
import { getAllProductIds, getProductById } from "@/lib/products-util";

export default function ProductPage({ product }) { 
  return (
    <Layout>
      <h1 className="h1">Product Page</h1>
      <ProductInfo product={product} />
    </Layout>
  );
};

export function getStaticProps(context) {
  const id = context.params.id;
  const product = getProductById(id);
  return {
    props: {
      product: product,
    },
    revalidate: 1000,
  };
};

export function getStaticPaths() {
  const productIds = getAllProductIds();
  const formattedIds = productIds.map(id => ({ params: {id: id}}));
  return {
    paths: formattedIds,
    fallback: false,
  };
};
