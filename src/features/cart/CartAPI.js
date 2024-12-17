export function addToCart(userCartData) {
  console.log("userCartData:", userCartData);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(userCartData),
        headers: { "Content-Type": "application/json" } // Fixed typo here
      });

      if (!response.ok) {
        // If the response status is not OK, reject the promise with the error
        const errorData = await response.json();
        return reject(errorData);
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error("Error in addToCart:", error);
      reject({ error: "An error occurred while adding to cart." });
    }
  });
}


export function fetchItemByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart" )
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateCart(update) {
  console.log(update)
  console.log(update.id)
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json()
    console.log(data)
    resolve({ data })
  }
  );
}

export function removeFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/"+itemId, {
      method: "DELETE",
      headers: { "content-type": "application/jsom" }
    });
    const data = await response.json()
    resolve({ data: {id: itemId} })
  }
  );
}


export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserId();
    // console.log(items)
    const items = await response.data
    for (let item of items) {
      console.log(item)
      await removeFromCart(item.id)
    }
    resolve({ status: "success" })
  }
  );
}

