import { buildProductsPath, extractProducts } from "@/pages/api/products";

export function getAllProducts() {
  const filePath = buildProductsPath();
  const data = extractProducts(filePath);
  return data;
};

export function getProductsByGroup(group) {
  const products = getAllProducts();
  return products.filter(product => product.group === group);
};

export function getAllProductIds() {
  const products = getAllProducts();
  return products.map(product => product.id);
};

export function getProductById(id) {
  const products = getAllProducts();
  return products.find(product => product.id === id);
};
