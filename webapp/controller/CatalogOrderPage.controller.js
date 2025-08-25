sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.CatalogOrderPage", {
        onInit() {
        },

// Navigation to Phone Page       
    onPhones: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RoutePhonePage") 
    },

// Navigation Back to Main Page
    onNavBackMainPage: function () {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainPage");
    }

    });
});