"use strict";

// Define the `productcatApp` module
angular.module("productcatApp", [
  "ngAnimate",
  "ngRoute",
  "core",
  "login",
  "register",
  "appHeader",
  "mainFooter",
  "productDetail",
  "productList",
]);

angular.module("productcatApp").directive("selectNgFiles", function () {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function (e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      });
    },
  };
});

angular.module("productcatApp").run(function ($templateCache) {
  $templateCache.removeAll();
});
