import products from "./products.json";

export const getProduct = () => {
  return Promise.resolve(products);
};
