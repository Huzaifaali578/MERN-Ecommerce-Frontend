export function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/products");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise with the error
    }
  });
}

export function fetchProductByFilter({ filter, sort }) {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "";

      // Add filters
      for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length) {
          const lastCategoryValue = categoryValues[categoryValues.length - 1]
          queryString += `${key}=${lastCategoryValue}&`;
        }
      }

      // Add sorting
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }

      console.log("Query String:", queryString);

      if (queryString) {
        const response = await fetch(
          "http://localhost:8080/products?" + queryString
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        resolve({ data });
      } else {
        resolve({ data: [] }); // No filters or sort
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      reject(error);
    }
  });
}

