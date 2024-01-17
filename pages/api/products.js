import fs from 'fs';
import path from 'path';

export function buildProductsPath() {
  return path.join(process.cwd(), 'data', 'products.json');
};

export function extractProducts(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  const filePath = buildProductsPath();
  const data = extractProducts(filePath);
  if (req.method === 'GET') {
    res.status(200).json({products: data});
  }
  if (req.method === 'PUT') {
    const { id } = req.body;
    const updatedProducts = data.map(product => {
      if (product.id === id) {
        return req.body;
      };

      return product;
    });
    console.log('updatedProducts ', updatedProducts);
    fs.writeFileSync(filePath, JSON.stringify(updatedProducts));
    res.status(201).json({message: 'Success!', products: updatedProducts});
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    }
  }
};