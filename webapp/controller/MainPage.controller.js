sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.MainPage", {
    onInit() {

    },
    

// Navigation to CatalogPage
    onPressCatalogOrder: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCatalogOrderPage") 
    },

// Navigation to PurchaseOrder Create Page
    onPurchaseOrderCreate: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePOCreatePage")
    },

// Navigation Back to Login Page
    onNavBackLoginPage: function () {
        
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteLoginPage", {}, true); 
    }

    });
});