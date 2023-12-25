"use strict";

// Register `mainFooter` component, along with its associated controller and template
angular.module("mainFooter").component("mainFooter", {
  templateUrl: "main-footer/main-footer.template.html",
  controller: ["Product", function MainFooterController(Product) {}],
});
