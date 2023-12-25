"use strict";

angular.module("core.product").factory("Product", [
  "$resource",
  function ($resource) {
    const apiUrl = "http://localhost:9000/products";

    return $resource(
      `${apiUrl}/:param/:idProduct/:idCategory`,
      {
        // idProduct: "@idProduct",
        // category: "@category",
      },
      {
        getProducts: {
          method: "GET",
          isArray: true,
          // transformResponse: function (data, headersGetter, status) {
          //   let jsonData = angular.fromJson(data);
          //   let products =
          //     jsonData && jsonData.products ? jsonData.products : [];

          //   return products;
          // },
        },
        getCategories: {
          method: "GET",
          isArray: true,
          params: { param: "categories" },
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            return jsonData.map((item) => ({
              id: item.id,
              name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            }));
          },
        },
        addProduct: {
          method: "POST",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
        editProduct: {
          method: "PUT",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
        delProduct: {
          method: "DELETE",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
      }
    );
  },
]);
