import { json } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

const domain = "http://localhost:8080";

export const getProduct = () => {
  const productUrl = domain + "/products";

  return fetch(productUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Something wrong, try again");
    }
    return response.json();
  });
};

export const searchProductByName = (name) => {
  const productUrl = `${domain}/search?Title=${encodeURIComponent(name)}`;
  return fetch(productUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Something wrong, try again");
    }
    return response.json();
  });
};

export const getProductById = (id) => {
  const productUrl = `${domain}/item?id=${encodeURIComponent(id)}`;
  return fetch(productUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Something wrong, try again");
    }
    return response.json();
  });
};

export const login = (credential) => {
  const loginUrl = domain + "/login";

  console.log(credential);

  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }

    return response.text();
  });
};

export const register = (credential) => {
  const registerUrl = domain + "/register";
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const getShoppingCart = () => {
  const getShoppingCartUrl = domain + "/cart";
  const token = localStorage.getItem("userToken");
  return fetch(getShoppingCartUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to getShoppingcart");
    }
    return response.json();
  });
};

export const getProductList = (products, cartData) => {
  const getProductListUrl = domain + "/list/products";
  return fetch(getProductListUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to getProductList");
    }

    return new Promise(function (resolve, reject) {
      response.json().then((ProductDetails) => {
        for (let i = 0; i < ProductDetails.length; i++) {
          Object.assign(ProductDetails[i], cartData[i]);
        }
        console.log(ProductDetails);
        resolve(ProductDetails);
      });
    });
  });
};

export const cartCheckout = (items) => {
  const cartCheckoutUrl = domain + "/cart/checkout";
  const token = localStorage.getItem("userToken");
  return fetch(cartCheckoutUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(items),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to cartCheckout");
    }
  });
};

export const addCart = (id) => {
  const addCartUrl = domain + "/cart?Item_id=" + id + "&Quantity=1";
  const token = localStorage.getItem("userToken");
  console.log(addCartUrl);
  return fetch(addCartUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to addCart");
    }
  });
};
