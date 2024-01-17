import { buildProductsPath, extractProducts } from "./products";

function handler(req, res) {
  const productId = req.query.productId;
  const filePath = buildProductsPath();
  const products = extractProducts(filePath);
  const selectedProduct = products.find(
    (product) => product.id === productId
  );
  res.status(201).json({ message: 'Success', product: selectedProduct});
}

export default handler;