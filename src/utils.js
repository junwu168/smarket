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
