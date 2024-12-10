export function fetchProductByFilter({ filter, sort, pagination }) {
  return new Promise(async (resolve, reject) => {
    try {

      // filter = {"category": [smartphone, laptop], "brand": [apple, samsung]};
      // sort = {_sort: "price", _order: "desc"};
      // pagination = {_page: 1, _limit: 10};
      // TODO: on server we will support multi value filter
      // TODO: server will filter the deleted peoduct
      let queryString = "";

      // Add filters
      for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length) {
          const lastCategoryValue = categoryValues[categoryValues.length - 1];
          queryString += `${key}=${lastCategoryValue}&`;
        }
      }

      // Add sorting
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }

      // Add pagination
      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
      }

      console.log(pagination)
      console.log(queryString)

      const url = queryString 
        ? `http://localhost:8080/products?${queryString}`
        : "http://localhost:8080/products";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      // // Get the total number of items from the header
      // resolve({ data });
      const totalItems = await response.headers.get('X-Total-Count');
      resolve({ data: { products: data, totalItems: +totalItems } });

    } catch (error) {
      console.error("Fetch Error:", error);
      reject(error);
    }
  });
}

export function fetchCategory() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = "http://localhost:8080/category"
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      resolve({ data });

    } catch (error) {
      console.error("Fetch Error:", error);
      reject(error);
    }
  });
}

export function fetchBrand() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = "http://localhost:8080/brand"
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      resolve({ data });

    } catch (error) {
      console.error("Fetch Error:", error);
      reject(error);
    }
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id)
      const url = "http://localhost:8080/products/"+ id
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log(data)
      resolve({ data });

    } catch (error) {
      console.error("Fetch Error:", error);
      reject(error);
    }
  });
}

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json()
    resolve({ data });
  })
}


export function updateProduct(update) {
  return new Promise(async (resolve) => {
    console.log(update.id)
    const response = await fetch("http://localhost:8080/products/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json()
    resolve({ data })
  }
  );
}