"use strict";

// Register `register` component, along with its associated controller and template
angular.module("register").component("register", {
  templateUrl: "register/register.template.html",
  controller: [
    "User",
    "$location",
    function RegisterController(User, $location) {
      var self = this;

      self.handleRegister = function () {
        User.createAccount(
          {
            name: self.name,
            email: self.email,
            password: self.password,
            phone: self.phone,
          },
          function (result) {
            $location.path("/login");
          }
        );
      };
    },
  ],
});
