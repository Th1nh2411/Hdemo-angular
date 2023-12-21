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
        if (Array.isArray(self.productData.thumbnail)) {
          self.productData.thumbnail = URL.createObjectURL(
            self.productData.thumbnail[0]
          );
        }

        if (self.edit) {
          Product.editProduct(
            { idProduct: self.productData.id },
            { ...self.productData, id: undefined },
            function (newProducts) {
              successToast.show();
              formModal.hide();
              var indexToReplace = self.products.findIndex(
                (obj) => obj.id === self.productData.id
              );
              if (indexToReplace !== -1) {
                self.products.splice(indexToReplace, 1, newProducts);
              }
              self.loading = false;
            },
            function (error) {
              formModal.hide();
              alert("error");
              self.loading = false;
            }
          );
        } else {
          Product.addProduct(
            self.productData,
            function (newProducts) {
              successToast.show();
              formModal.hide();
              self.products.unshift(newProducts);
              self.loading = false;
            },
            function (error) {
              formModal.hide();
              alert("error");
              self.loading = false;
            }
          );
        }
      };
      // Handle edit product
      self.handleEdit = function (data) {
        self.productData = data;
        document.getElementById("formModalLabel").innerText = `Edit product`;
        document.getElementById("submit-btn").innerText = `Edit product`;
        self.edit = true;
      }; // Handle edit product
      self.handleDelete = function (data) {
        if (window.confirm("Do you really want delete this product?")) {
          self.loading = true;
          Product.delProduct(
            { idProduct: data.id },
            function () {
              successToast.show();
              var indexToDel = self.products.findIndex(
                (obj) => obj.id === data.id
              );
              if (indexToDel !== -1) {
                self.products.splice(indexToDel, 1);
              }
              self.loading = false;
            },
            function () {
              alert("error");
            }
          );
        }
      };
    },
  ],
});
