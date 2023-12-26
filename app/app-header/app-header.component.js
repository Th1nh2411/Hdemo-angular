"use strict";

// Register `appHeader` component, along with its associated controller and template
angular.module("appHeader").component("appHeader", {
  templateUrl: "app-header/app-header.template.html",
  controller: [
    "$location",
    "ProductService",
    function AppHeaderController($location, ProductService) {
      var self = this;
      self.isActiveLink = function (viewLocation) {
        return viewLocation === $location.path();
      };
      self.handleSearch = function () {
        ProductService.updateQueryProduct(self.query);
      };
    },
  ],
});
