"use strict";

// Register `userList` component, along with its associated controller and template
angular.module("userList").component("userList", {
  templateUrl: "user-list/user-list.template.html",
  controller: [
    "User",
    "$cookies",
    function userListController(User, $cookies) {
      var self = this;
      self.isAdmin = JSON.parse($cookies.get("userInfo")).role === "admin";
      // var myToast = new bootstrap.Toast(document.getElementById("myToast"));
      self.loading = true;

      self.sort = "user_id";
      self.category = "";

      self.handleClear = function () {
        self.query = "";
      };
      // Get data
      self.getUsers = function (page = 1) {
        self.loading = true;

        User.getUsers(
          {
            q: self.query,
            page: page,
            sort: self.sort,
          },
          function (data) {
            self.users = data;
            self.loading = false;
            self.totalPages = Array.from(
              { length: data.total_pages },
              (_, index) => index + 1
            );
          }
        );
      };

      self.getUsers();

      // HANDLE PAGINATION
      self.handleChangePage = function (page) {
        self.getUsers(page);
      };
      self.handlePreviousPage = function () {
        self.getUsers(Number(self.users.current_page) - 1);
      };
      self.handleNextPage = function () {
        self.getUsers(Number(self.users.current_page) + 1);
      };
      self.handleSortUser = function (value) {
        if (self.sort === value) {
          self.sort = "-" + self.sort;
        } else {
          self.sort = value;
        }
        self.getUsers();
      };
    },
  ],
});
