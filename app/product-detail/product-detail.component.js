"use strict";

// Register `productDetail` component, along with its associated controller and template
angular.module("productDetail").component("productDetail", {
  templateUrl: "product-detail/product-detail.template.html",
  controller: [
    "$routeParams",
    "Product",
    "AppService",
    function PhoneDetailController($routeParams, Product, AppService) {
      var self = this;
      self.loading = true;
      var imageFormModal = new bootstrap.Modal(
        document.getElementById("imageFormModal")
      );

      self.stars = Array.from({ length: 5 }, (_, index) => index + 1);

      self.product = Product.get(
        { idProduct: $routeParams.idProduct },
        function (product) {}
      );
      self.getImages = function () {
        self.images = Product.getProductImages(
          { idProduct: $routeParams.idProduct },
          function (images) {
            self.setMainImage(images[0]);
            self.loading = false;
          }
        );
      };
      self.getImages();
      self.setMainImage = function (imageUrl) {
        self.mainImageUrl = imageUrl;
      };
      self.handleOpenAddImageModal = function () {
        self.imageFormLabel = "Add Image";
        self.modalType = "add";
        imageFormModal.show();
      };
      self.handleOpenEditImageModal = function () {
        self.imageFormLabel = "Edit Image";
        self.modalType = "edit";
        self.productImage = self.mainImageUrl.image_url;
        imageFormModal.show();
      };

      self.handleSubmitFormImage = function () {
        if (self.modalType === "edit") {
          Product.updateProductImage(
            {
              idImage: self.mainImageUrl.id,
            },
            {
              image_url: self.productImage,
            },

            function (images) {
              self.getImages();
              imageFormModal.hide();
            },
            function () {
              alert("error");
            }
          );
        } else {
          Product.addProductImage(
            {
              product_id: $routeParams.idProduct,
              image_url: self.productImage,
            },
            function (images) {
              self.getImages();
              imageFormModal.hide();
            },
            function () {
              alert("error");
            }
          );
        }
      };
      self.handleDeleteImage = function () {
        if (window.confirm("Do you really want to remove this image?")) {
          Product.deleteProductImage(
            { idImage: self.mainImageUrl.id },
            function () {
              self.getImages();
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
