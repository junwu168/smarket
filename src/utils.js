import data from "./products.json";

export const getProduct = () => {
  return Promise.resolve(data);
};

const products = data.products;
export const getProductById = (id) => {
  const product = products.find((p) => p.id === parseInt(id));

  if (product) {
    return Promise.resolve(product);
  } else {
    return Promise.reject(new Error("Product not found"));
  }
};
