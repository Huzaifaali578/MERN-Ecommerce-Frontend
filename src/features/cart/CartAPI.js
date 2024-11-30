export function addToCart(userCartData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(userCartData),
      headers: { "content-type": "application/jsom" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchItemByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user="+userId )
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/jsom" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function removeFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+itemId, {
      method: "DELETE",
      headers: { "content-type": "application/jsom" }
    });
    const data = await response.json()
    resolve({ data: {id: itemId} })
  }
  );
}
