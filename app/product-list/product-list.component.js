"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    function productListController(Product) {
      var self = this;
      self.loading = true;
      self.products = Product.query(function () {
        self.loading = false;
      });
      self.orderProp = "price";
    },
  ],
});
