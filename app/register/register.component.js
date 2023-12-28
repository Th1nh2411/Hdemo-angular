"use strict";

// Register `register` component, along with its associated controller and template
angular.module("register").component("register", {
  templateUrl: "register/register.template.html",
  controller: [
    "$location",
    function RegisterController($location) {
      var self = this;
      self.isActiveLink = function (viewLocation) {
        return viewLocation === $location.path();
      };
    },
  ],
});
