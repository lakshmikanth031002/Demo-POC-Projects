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

// Navigation Back to Login Page
    onNavBackMainPage: function () {
        var oHistory = sap.ui.core.routing.History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1); // Navigate back in browser history
        } else {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainPage", {}, true); // Navigate to a default route if no history exists
        }
    }

    });
});