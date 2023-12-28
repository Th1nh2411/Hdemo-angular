"use strict";

angular.module("productcatApp").config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/", {
        template: "<h1>It's home guys</h1>",
      })
      .when("/products", {
        template: "<product-list></product-list>",
      })
      .when("/products/:idProduct", {
        template: "<product-detail></product-detail>",
      })
      .when("/about", {
        template: "<h1>It's about guys</h1>",
      })
      .when("/FAQ", {
        template: "<h1>It's FAQ guys</h1>",
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
