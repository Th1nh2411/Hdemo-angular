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
            // Chuyển đổi giá trị cookie từ chuỗi JSON thành đối tượng

            // Sử dụng giá trị của cookie
            console.log("User ID:", self.userInfo.user_id);
            console.log("Email:", self.userInfo.email);
          } else {
            console.log("Cookie không tồn tại hoặc đã hết hạn.");
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
