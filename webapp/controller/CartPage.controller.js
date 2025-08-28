sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("ladera.mobiles.controller.CartPage", {
    onInit() {

    },

    // Navigation Back to Phone Details Page
    onNavBackPhoneDetails: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("RoutePhoneDetailsPage");
    },

////////////////////////////////////////////////////////////////////////////////////////////

    // Increase the Quantity 
    onIncreaseQuantity: function (oEvent) {
      const oSource = oEvent.getSource().getBindingContext("cartModel");
      const sPath = oSource.getPath();
      const oModel = oSource.getModel();
      const oItem = oModel.getProperty(sPath);

      if (typeof oItem.price === "string") {
        const rawPrice = oItem.price.replace(/[₹,~]/g, "");
        var numericPrice = parseInt(rawPrice, 10);
      }

      oItem.quantity = (oItem.quantity || 0) + 1;
      oItem.priceQuantity = oItem.quantity * numericPrice;
      if (oItem.totalAmount) {
        oItem.totalAmount = numericPrice + oModel.oData.totalAmount;
      } else if (oModel.oData.totalAmount) {
        oItem.totalAmount = numericPrice + oModel.oData.totalAmount;
      }
      else {
        oItem.totalAmount = oItem.quantity * numericPrice
      }
      oModel.setProperty(sPath + "/quantity", oItem.quantity);
      oModel.setProperty("/totalAmount", oItem.totalAmount);
      oModel.setProperty("/priceQuantity", oItem.priceQuantity);

    },

    // Decrease the Quantity 
    onDecreaseQuantity: function (oEvent) {
      const oSource = oEvent.getSource().getBindingContext("cartModel");
      const sPath = oSource.getPath();
      const oModel = oSource.getModel();
      const oItem = oModel.getProperty(sPath);

      if (typeof oItem.price === "string") {
        const rawPrice = oItem.price.replace(/[₹,~]/g, "");
        var numericPrice = parseInt(rawPrice, 10);
      }

      if (oItem.quantity > 1 || oItem.quantity === 1) {
        oItem.quantity -= 1;
        oItem.totalAmount = oModel.oData.totalAmount - numericPrice;
        oItem.priceQuantity = oItem.quantity * numericPrice;

        oModel.setProperty(sPath + "/quantity", oItem.quantity);
        oModel.setProperty("/totalAmount", oItem.totalAmount);
        oModel.setProperty("/priceQuantity", oItem.priceQuantity);

      }
    },
////////////////////////////////////////////////////////////////////////////////////////////

    // Delete Cart Items
    onDeleteCartItems: function () {
      var oTable = this.byId("CartPage").getContent()[1];
      var aSelectedIndices = oTable.getSelectedIndices();


      if (aSelectedIndices.length === 0) {
        MessageToast.show("Please select at least one item to delete.");
        return;
      }

      var oModel = this.getView().getModel("cartModel");
      var aItems = oModel.getProperty("/cartItems");
      var totalAmount = oModel.getProperty("/totalAmount") || 0;

      // Sort indices in descending order to delete without index shift
      aSelectedIndices.sort((a, b) => b - a);

      aSelectedIndices.forEach(function (index) {
        var oItem = aItems[index];
        var priceQuantity = oItem.priceQuantity || 0;

        // Subtract from total amount
        totalAmount -= priceQuantity;

        // Remove item from array
        aItems.splice(index, 1);
      });

      // Set updated cart and total
      oModel.setProperty("/cartItems", aItems);
      oModel.setProperty("/totalAmount", totalAmount);

      MessageToast.show("Item(s) deleted successfully.");
    }



  });
});