"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    function productListController(Product) {
      var self = this;
      var myToast = new bootstrap.Toast(document.getElementById("myToast"));
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
          { idCategory: self.category, param: "category" },
          function () {
            self.loading = false;
          }
        );
      };

      self.getAllProducts();
      // handle event
      self.onChangeCategory = function () {
        if (self.category) {
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
        if (self.edit) {
          Product.editProduct(
            { idProduct: self.productData.id },
            {
              ...self.productData,
              id: undefined,
              category: undefined,
            },
            function (newProducts) {
              self.toastText = "Edit product Successfully";
              myToast.show();
              formModal.hide();
              self.getAllProducts();
            },
            function (error) {
              alert("error");
            }
          );
        } else {
          Product.addProduct(
            self.productData,
            {
              ...self.productData,
              category: undefined,
            },
            function (newProducts) {
              self.toastText = "Add product Successfully";
              myToast.show();
              formModal.hide();
              self.getAllProducts();
            },
            function (error) {
              alert("error");
            }
          );
        }
      };
      // Handle click edit product
      self.handleClickEditBtn = function (data) {
        self.productData = data;
        self.formLabel = `Edit product`;
        self.formLabel = `Edit product`;
        self.edit = true;
      }; // Handle click add product
      self.handleClickAddBtn = function (data) {
        self.productData = {};
        self.formLabel = `Add product`;
        self.formLabel = `Add product`;
        self.edit = false;
      }; // Handle edit product
      self.handleDelete = function (data) {
        if (window.confirm("Do you really want delete this product?")) {
          self.loading = true;
          Product.delProduct(
            { idProduct: data.id },
            function () {
              self.toastText = "Delete product Successfully";
              myToast.show();
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
