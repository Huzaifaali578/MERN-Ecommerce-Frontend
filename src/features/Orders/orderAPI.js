export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/jsom" }
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

    const response = await fetch(`http://localhost:8080/orders?${queryString}`)
    const data = await response.json()
    console.log("data", data)
    resolve({ data })
  }
  );
}