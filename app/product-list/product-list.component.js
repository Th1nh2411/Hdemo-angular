"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    "ProductService",
    "$scope",
    function productListController(Product, ProductService, $scope) {
      var self = this;
      var myToast = new bootstrap.Toast(document.getElementById("myToast"));
      var formModal = new bootstrap.Modal(document.getElementById("formModal"));
      self.loading = true;

      self.categories = Product.getCategories();
      self.orderProp = "title";
      self.category = "";

      // Get data

      self.getProductsByCategory = function () {
        self.loading = true;

        if (self.category) {
          self.products = Product.getProducts(
            {
              idCategory: self.category,
              param: "category",
              q: ProductService.getQueryProduct(),
            },
            function () {
              self.loading = false;
            }
          );
        } else {
          self.products = Product.getProducts(
            {
              q: ProductService.getQueryProduct(),
            },
            function () {
              self.loading = false;
            }
          );
        }
      };
      $scope.$watch(
        function () {
          return ProductService.getQueryProduct();
        },
        function (newQuery) {
          self.getProductsByCategory();
        }
      );
      self.getProductsByCategory();
      // handle event
      self.onChangeCategory = function () {
        if (self.category) {
          self.getProductsByCategory();
        } else {
          self.getProductsByCategory();
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
              self.getProductsByCategory();
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
              self.getProductsByCategory();
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
          Product.delProduct(
            { idProduct: data.id },
            function () {
              self.toastText = "Delete product Successfully";
              myToast.show();
              self.getProductsByCategory();
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
