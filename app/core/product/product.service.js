"use strict";

angular.module("core.product").factory("Product", [
  "$resource",
  function ($resource) {
    const apiUrl = "https://dummyjson.com/products";

    return $resource(
      `${apiUrl}/:param/:idProduct/:category`,
      {
        // idProduct: "@idProduct",
        // category: "@category",
      },
      {
        getProducts: {
          method: "GET",
          isArray: true,
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            let products =
              jsonData && jsonData.products ? jsonData.products : [];

            return products;
          },
        },
        getCategories: {
          method: "GET",
          isArray: true,
          params: { param: "categories" },
        },
      }
    );
  },
]);
