"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    function productListController(Product) {
      var self = this;
      self.loading = true;

      self.categories = Product.getCategories();
      self.orderProp = "title";
      self.category = "";

      // Get data
      self.onChangeCategory = function () {
        if (self.category != "") {
          self.getProductsByCategory();
        } else {
          self.getAllProducts();
        }
      };

      self.getAllProducts = function () {
        self.loading = true;
        self.products = Product.getProducts(function () {
          self.loading = false;
        });
      };
      self.getProductsByCategory = function () {
        self.loading = true;
        self.products = Product.getProducts(
          { category: self.category, param: "category" },
          function () {
            self.loading = false;
          }
        );
      };
      self.getAllProducts();
    },
  ],
});
