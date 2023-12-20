"use strict";

angular.module("productcatApp").config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/products", {
        template: "<product-list></product-list>",
      })
      .when("/products/:productId", {
        template: "<product-detail></product-detail>",
      })
      .otherwise("/products");
  },
]);
