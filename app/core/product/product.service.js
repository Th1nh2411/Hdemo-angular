"use strict";
const url = "https://dummyjson.com/products";
angular.module("core.product").factory("Product", [
  "$resource",
  function ($resource) {
    return $resource(
      `${url}/:productId`,
      {},
      {
        query: {
          method: "GET",
          isArray: true,
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            let products =
              jsonData && jsonData.products ? jsonData.products : [];

            return products;
          },
        },
      }
    );
  },
]);
