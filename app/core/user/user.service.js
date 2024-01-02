"use strict";

angular.module("core.user").factory("User", [
  "$resource",
  "AppService",
  "$cookies",
  function ($resource, AppService, $cookies) {
    const apiUrl = "http://localhost:9000";
    function handleResponse(data, headersGetter, status) {
      let jsonData = angular.fromJson(data);
      if (jsonData.message) {
        AppService.updateToast({
          title: jsonData.message,
          type: status === 200 ? "success" : "danger",
        });
      }

      return jsonData;
    }
    return $resource(
      `${apiUrl}/:param`,
      {},
      {
        getUsers: {
          method: "GET",
          params: { param: "users" },
          isArray: false,
          withCredentials: true,
          transformResponse: handleResponse,
        },
        login: {
          method: "POST",
          params: { param: "login" },
          isArray: false,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          transformResponse: handleResponse,
        },
        createAccount: {
          method: "POST",
          params: { param: "register" },
          isArray: false,
          headers: { "Content-Type": "application/json" },
          transformResponse: handleResponse,
        },
      }
    );
  },
]);
