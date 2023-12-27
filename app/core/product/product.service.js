"use strict";

angular.module("core.product").factory("Product", [
  "$resource",
  function ($resource) {
    const apiUrl = "http://localhost:9000/products";

    return $resource(
      `${apiUrl}/:param/:idProduct/:idCategory/:idImage`,
      {},
      {
        getProducts: {
          method: "GET",
          isArray: false,
          // transformResponse: function (data, headersGetter, status) {
          //   let jsonData = angular.fromJson(data);

          //   return jsonData;
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
        getProductImages: {
          params: { param: "image" },
          method: "GET",
          isArray: true,
          headers: { "Content-Type": "application/json" },
        },
        addProductImage: {
          params: { param: "image" },
          method: "POST",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
        updateProductImage: {
          params: { param: "image" },
          method: "PUT",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
        deleteProductImage: {
          params: { param: "image" },
          method: "DELETE",
          isArray: false,
          headers: { "Content-Type": "application/json" },
        },
      }
    );
  },
]);
angular.module("core.product").factory("ProductService", [
  function () {
    var sharedData = {
      queryProduct: [],
    };

    function updateQueryProduct(newQueryProduct) {
      sharedData.queryProduct = newQueryProduct;
    }

    function getQueryProduct() {
      return sharedData.queryProduct;
    }

    return {
      updateQueryProduct: updateQueryProduct,
      getQueryProduct: getQueryProduct,
    };
  },
]);
