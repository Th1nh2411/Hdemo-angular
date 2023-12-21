"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    function productListController(Product) {
      var self = this;
      var successToast = new bootstrap.Toast(
        document.getElementById("successToast")
      );
      var formModal = new bootstrap.Modal(document.getElementById("formModal"));
      self.loading = true;

      self.categories = Product.getCategories();
      self.orderProp = "title";
      self.category = "";

      // Get data

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
      // handle event
      self.onChangeCategory = function () {
        if (self.category != "") {
          self.getProductsByCategory();
        } else {
          self.getAllProducts();
        }
      };
      self.productData = {
        title: "",
        description: "",
        category: "",
        price: "",
        thumbnail: null,
        // Thêm các thuộc tính khác nếu cần
      };

      // Submit form
      self.onSubmitForm = function () {
        self.loading = true;
        // Change file image to string
        console.log(self.productData.thumbnail);
        if (self.productData.thumbnail) {
          self.productData.thumbnail = URL.createObjectURL(
            self.productData.thumbnail[0]
          );
        }

        Product.addProducts(self.productData, function (newProducts) {
          successToast.show();
          formModal.hide();
          self.products.unshift(newProducts);
          self.loading = false;
        });
      };
    },
  ],
});
