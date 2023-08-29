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

const SERVER_ORIGIN = "";

const loginUrl = `${SERVER_ORIGIN}/login`;

// export const login = (credential) => {
//   const formData = new FormData();
//   formData.append("username", credential.username);
//   formData.append("password", credential.password);

//   return fetch(loginUrl, {
//     method: "POST",
//     credentials: "include",
//     body: formData,
//   }).then((response) => {
//     if (response.status !== 204) {
//       throw Error("Fail to log in");
//     }
//   });
// };

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

// export const logout = () => {
//   return fetch(logoutUrl, {
//     method: "POST",
//     credentials: "include",
//   }).then((response) => {
//     if (response.status !== 204) {
//       throw Error("Fail to log out");
//     }
//   });
// };

//mock login
export const login = (credential) => {
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
};

//mock logout
export const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful logout
      resolve();
    }, 1000); // This will wait for 1 second before resolving the promise
  });
};
