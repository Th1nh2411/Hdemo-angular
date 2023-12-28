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
            // Chuyển đổi giá trị cookie từ chuỗi JSON thành đối tượng
            var userInfo = JSON.parse(newValue);

            // Sử dụng giá trị của cookie
            console.log("User ID:", userInfo.user_id);
            console.log("Email:", userInfo.email);
          } else {
            console.log("Cookie không tồn tại hoặc đã hết hạn.");
          }
        }
      );
    },
  ],
});
