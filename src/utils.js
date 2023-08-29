import products from "./products.json";

export const getProduct = () => {
  return Promise.resolve(products);
};

const SERVER_ORIGIN = "";

const loginUrl = `${SERVER_ORIGIN}/login`;

export const login = (credential) => {
  const formData = new FormData();
  formData.append("username", credential.username);
  formData.append("password", credential.password);

  return fetch(loginUrl, {
    method: "POST",
    credentials: "include",
    body: formData,
  }).then((response) => {
    if (response.status !== 204) {
      throw Error("Fail to log in");
    }
  });
};

const registerUrl = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

const logoutUrl = `${SERVER_ORIGIN}/logout`;

export const logout = () => {
  return fetch(logoutUrl, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (response.status !== 204) {
      throw Error("Fail to log out");
    }
  });
};

//mock login
/* export const login = (credential) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // mock network delay
      if (
        credential.username === "test" &&
        credential.password === "password" //mock username and password
      ) {
        resolve(); // login success
      } else {
        reject(new Error("Invalid username or password")); // login fail
      }
    }, 1000);
  });
}; */
