export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some information of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/users?email=${email}`);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({message: "wront credential"});
      }
    } else {
      console.log("user not found");
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server
    resolve({ data: {status: "succes"} });
  });
}


