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
      if (oItem.totalAmount) {
        oItem.totalAmount= numericPrice + oModel.oData.totalAmount;
      } else if (oModel.oData.totalAmount){
        oItem.totalAmount= numericPrice + oModel.oData.totalAmount;
      }
      else {
        oItem.totalAmount = oItem.quantity * numericPrice
      }      
      oModel.setProperty(sPath + "/quantity", oItem.quantity);
      oModel.setProperty("/totalAmount", oItem.totalAmount);

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
        oModel.setProperty(sPath + "/quantity", oItem.quantity);
        oModel.setProperty("/totalAmount", oItem.totalAmount);

      }
    },

    


  });
});