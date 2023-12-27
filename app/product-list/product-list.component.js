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
      self.sort = "product.title";
      self.category = "";

      // Get data
      self.getProductsByCategory = function (page = 1) {
        self.loading = true;

        if (self.category) {
          Product.getProducts(
            {
              idCategory: self.category,
              param: "category",
              q: ProductService.getQueryProduct(),
              page: page,
              // sortBy: self.sort,
            },
            function (data) {
              self.products = data;
              self.loading = false;
              self.totalPages = Array.from(
                { length: data.total_pages },
                (_, index) => index + 1
              );
            }
          );
        } else {
          Product.getProducts(
            {
              q: ProductService.getQueryProduct(),
              page: page,
              // sortBy: self.sort,
            },
            function (data) {
              self.products = data;
              self.loading = false;
              self.totalPages = Array.from(
                { length: data.total_pages },
                (_, index) => index + 1
              );
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
      // self.getProductsByCategory();

      // Submit form
      self.onSubmitForm = function () {
        if (self.edit) {
          Product.editProduct(
            { idProduct: self.productData.id },
            {
              ...self.productData,
              id: undefined,
            },
            function () {
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
            function () {
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
        self.edit = true;
      }; // Handle click add product
      self.handleClickAddBtn = function () {
        self.productData = {
          category_id: self.category,
        };
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
      // HANDLE PAGINATION
      self.handleChangePage = function (page) {
        self.getProductsByCategory(page);
      };
      self.handlePreviousPage = function () {
        self.getProductsByCategory(Number(self.products.current_page) - 1);
      };
      self.handleNextPage = function () {
        self.getProductsByCategory(Number(self.products.current_page) + 1);
      };
    },
  ],
});
