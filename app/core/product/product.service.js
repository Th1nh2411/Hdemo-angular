"use strict";

angular.module("core.product").factory("Product", [
  "$resource",
  "AppService",
  function ($resource, AppService) {
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
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
        },
        editProduct: {
          method: "PUT",
          isArray: false,
          headers: { "Content-Type": "application/json" },
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
        },
        delProduct: {
          method: "DELETE",
          isArray: false,
          headers: { "Content-Type": "application/json" },
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
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
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
        },
        updateProductImage: {
          params: { param: "image" },
          method: "PUT",
          isArray: false,
          headers: { "Content-Type": "application/json" },
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
        },
        deleteProductImage: {
          params: { param: "image" },
          method: "DELETE",
          isArray: false,
          headers: { "Content-Type": "application/json" },
          transformResponse: function (data, headersGetter, status) {
            let jsonData = angular.fromJson(data);
            AppService.updateToast({
              title: jsonData.message,
              type: status === 200 ? "success" : "danger",
            });
            return jsonData;
          },
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
