"use strict";

// Register `appHeader` component, along with its associated controller and template
angular.module("appHeader").component("appHeader", {
  templateUrl: "app-header/app-header.template.html",
  controller: [
    "$location",
    "$cookies",
    "$scope",
    function AppHeaderController($location, $cookies, $scope) {
      var self = this;
      self.isActiveLink = function (viewLocation) {
        return viewLocation === $location.path();
      };

      $scope.$watch(
        function () {
          return $cookies.get("userInfo");
        },
        function (newValue) {
          if (newValue) {
            self.userInfo = JSON.parse(newValue);
            var wordsArray = self.userInfo.name.trim().split(" ");
            var lastName = wordsArray[wordsArray.length - 1];
            self.userInfo.name = lastName;
          } else {
            self.userInfo = null;
          }
        }
      );
      self.handleLogout = function () {
        $location.path("/login");
        $cookies.remove("userInfo");
      };
    },
  ],
});
