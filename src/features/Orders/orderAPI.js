export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}
// export function createOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("/orders", {
//       method: "POST",
//       body: JSON.stringify(order),
//       headers: { "Content-Type": "application/json" }
//     });
//     const data = await response.json()
//     resolve({ data })
//   }
//   );
// }

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchAllOrders(sort, pagination) {
  return new Promise(async (resolve) => {

    let queryString = ''

  
      // Add sorting
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }

     // Add pagination
     for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`
    }

    const response = await fetch(`/orders?${queryString}`)
    const data = await response.json()
    console.log("data", data)
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalItems } })
  }
  );
}