"use strict";

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe("productCat Application", function () {
  it("should redirect `index.html` to `index.html#!/products", function () {
    browser.get("index.html");
    expect(browser.getCurrentUrl()).toContain("index.html#!/products");
  });

  describe("View: product list", function () {
    beforeEach(function () {
      browser.get("index.html#!/products");
    });

    it("should filter the product list as a user types into the search box", function () {
      var productList = element.all(by.repeater("product in $ctrl.products"));
      var query = element(by.model("$ctrl.query"));

      expect(productList.count()).toBe(20);

      query.sendKeys("nexus");
      expect(productList.count()).toBe(1);

      query.clear();
      query.sendKeys("motorola");
      expect(productList.count()).toBe(8);
    });

    it("should be possible to control product order via the drop-down menu", function () {
      var queryField = element(by.model("$ctrl.query"));
      var orderSelect = element(by.model("$ctrl.orderProp"));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var productNameColumn = element.all(
        by.repeater("product in $ctrl.products").column("product.name")
      );

      function getNames() {
        return productNameColumn.map(function (elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys("tablet"); // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122",
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi",
      ]);
    });

    it("should render product specific links", function () {
      var query = element(by.model("$ctrl.query"));
      query.sendKeys("nexus");

      element.all(by.css(".products li a")).first().click();
      expect(browser.getCurrentUrl()).toContain(
        "index.html#!/products/nexus-s"
      );
    });
  });

  describe("View: product detail", function () {
    beforeEach(function () {
      browser.get("index.html#!/products/nexus-s");
    });

    it("should display the `nexus-s` page", function () {
      expect(element(by.binding("$ctrl.product.name")).getText()).toBe(
        "Nexus S"
      );
    });

    it("should display the first product image as the main product image", function () {
      var mainImage = element(by.css("img.product.selected"));

      expect(mainImage.getAttribute("src")).toContain(
        "img/products/nexus-s.0.jpg"
      );
    });

    it("should swap the main image when clicking on a thumbnail image", function () {
      var mainImage = element(by.css("img.product.selected"));
      var thumbnails = element.all(by.css(".product-thumbs img"));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute("src")).toContain(
        "img/products/nexus-s.2.jpg"
      );

      thumbnails.get(0).click();
      expect(mainImage.getAttribute("src")).toContain(
        "img/products/nexus-s.0.jpg"
      );
    });
  });
});
