export function userOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/user/"+userId)
    const data = await response.json()
    console.log(data)
    resolve({ data })
  }
  );
}

export function updateAddress(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some information of user (not password)
    resolve({ data });
  });
}
export function fetchUserInfo() {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/own")
    const data = await response.json();
    // TODO: on server it will only return some information of user (not password)
    resolve({ data });
  });
}

