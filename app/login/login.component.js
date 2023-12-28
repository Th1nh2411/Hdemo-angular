"use strict";

// Register `login` component, along with its associated controller and template
angular.module("login").component("login", {
  templateUrl: "login/login.template.html",
  controller: [
    "$location",
    function LoginController($location) {
      var self = this;
      self.isActiveLink = function (viewLocation) {
        return viewLocation === $location.path();
      };
    },
  ],
});
