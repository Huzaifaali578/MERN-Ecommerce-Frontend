export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some information of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({data})
      } else {
        const error = await response.text()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/auth/check`);
      if (response.ok) {
        const data = await response.json();
        resolve({data})
      } else {
        const error = await response.text()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/api/auth/signout  `);
      if (response.ok) {
        const data = await response.json();
        resolve({data})
      } else {
        const error = await response.text()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  });
}





