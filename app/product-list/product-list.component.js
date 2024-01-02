"use strict";

// Register `productList` component, along with its associated controller and template
angular.module("productList").component("productList", {
  templateUrl: "product-list/product-list.template.html",
  controller: [
    "Product",
    "$cookies",
    function productListController(Product, $cookies) {
      var self = this;
      self.isAdmin = $cookies.get("userInfo")
        ? JSON.parse($cookies.get("userInfo")).role === "admin"
        : false;
      // var myToast = new bootstrap.Toast(document.getElementById("myToast"));
      self.loading = true;

      self.categories = Product.getCategories();
      self.sort = "title";
      self.category = "";

      self.handleClear = function () {
        self.query = "";
      };
      // Get data
      self.getProductsByCategory = function (page = 1) {
        self.loading = true;

        if (self.category) {
          Product.getProducts(
            {
              idCategory: self.category,
              param: "category",
              q: self.query,
              page: page,
              sort: self.sort,
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
              q: self.query,
              page: page,
              sort: self.sort,
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

      self.getProductsByCategory();

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
              self.openForm = false;
              self.getProductsByCategory();
            }
          );
        } else {
          Product.addProduct(self.productData, function () {
            self.openForm = false;
            self.getProductsByCategory();
          });
        }
      };
      // Handle click edit product
      self.handleClickEditBtn = function (data) {
        self.productData = data;
        self.edit = true;
      }; // Handle click add product
      self.handleClickAddBtn = function () {
        self.productData = {
          category_id: self.category,
        };
        self.edit = false;
      }; // Handle edit product
      self.handleDelete = function (data) {
        if (window.confirm("Do you really want delete this product?")) {
          Product.delProduct({ idProduct: data.id }, function () {
            self.getProductsByCategory();
          });
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
angular.module("productList").component("productForm", {
  templateUrl: "product-list/product-form.template.html",
  bindings: {
    openForm: "=",
    edit: "<",
    data: "=",
    categories: "<",
    submit: "=",
  },
  controller: [
    "Product",
    function (Product) {
      var self = this;
      var formModal = new bootstrap.Modal(document.getElementById("formModal"));

      self.$onChanges = function () {
        // Giá trị của variable1 và variable2 có sẵn trong self.variable1 và self.variable2
        if (self.edit) {
          self.formLabel = "Edit product";
        } else {
          self.formLabel = "Add product";
        }
      };
      self.onSubmitForm = () => {
        self.submit();
        formModal.hide();
      };
    },
  ],
});
