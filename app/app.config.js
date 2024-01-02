"use strict";

angular.module("productcatApp").config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/", {
        template: "<h1>This is home page</h1>",
      })
      .when("/products", {
        template: "<product-list></product-list>",
      })
      .when("/products/:idProduct", {
        template: "<product-detail></product-detail>",
      })
      .when("/about", {
        template: "<h1>This is about page</h1>",
      })
      .when("/FAQ", {
        template: "<h1>This is FAQ page</h1>",
      })
      .when("/admin", {
        template: "<user-list></user-list>",
      })
      .when("/login", {
        template: "<login></login>",
      })
      .when("/register", {
        template: "<register></register>",
      })
      .otherwise("/products");
  },
]);
