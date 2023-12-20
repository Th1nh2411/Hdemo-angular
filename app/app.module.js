"use strict";

// Define the `productcatApp` module
angular.module("productcatApp", [
  "ngAnimate",
  "ngRoute",
  "core",
  "productDetail",
  "productList",
]);
angular.module("productcatApp").run(function ($templateCache) {
  $templateCache.removeAll();
});
