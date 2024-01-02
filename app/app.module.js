"use strict";

// Define the `productcatApp` module
angular.module("productcatApp", [
  "ngAnimate",
  "ngRoute",
  "core",
  "login",
  "register",
  "appHeader",
  "mainFooter",
  "productDetail",
  "productList",
  "userList",
]);

angular.module("productcatApp").directive("selectNgFiles", function () {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function (e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      });
    },
  };
});

angular.module("productcatApp").run(function ($templateCache) {
  $templateCache.removeAll();
});
angular.module("productcatApp").component("toast", {
  template: `
  <div class="position-fixed  bottom-0 end-0 p-3" style="z-index: 11">
    <div id="myToast" class="toast text-white  bg-{{$ctrl.toast.type}} hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body ">
        {{$ctrl.toast.title}}
      </div>
    </div>
  </div>`,
  controller: [
    "AppService",
    "$scope",
    function (AppService, $scope) {
      var self = this;
      var myToast = new bootstrap.Toast(document.getElementById("myToast"));
      $scope.$watch(
        function () {
          return AppService.getToast();
        },
        function (newData) {
          myToast.show();
          self.toast = newData;
          self.toast.type = self.toast.type || "success";
        }
      );
    },
  ],
});
angular.module("productcatApp").factory("AppService", [
  function () {
    var sharedData = {
      toast: { title: "Success", type: "success" },
    };

    function updateToast(newToast) {
      sharedData.toast = newToast;
    }

    function getToast() {
      return sharedData.toast;
    }

    return {
      updateToast: updateToast,
      getToast: getToast,
    };
  },
]);
