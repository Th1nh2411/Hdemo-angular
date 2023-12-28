"use strict";

// Register `login` component, along with its associated controller and template
angular.module("login").component("login", {
  templateUrl: "login/login.template.html",
  controller: [
    "User",
    "$location",
    "$cookies",
    function LoginController(User, $location, $cookies) {
      var self = this;

      self.handleLogin = function () {
        User.login(
          { email: self.email, password: self.password },
          function (result) {
            // $cookies.put("userInfo", JSON.stringify(result.user));
            $location.path("/");
          }
        );
      };
    },
  ],
});
