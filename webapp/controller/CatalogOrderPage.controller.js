sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.CatalogOrderPage", {
        onInit() {
        },
        onPhones: function () {
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePhonePage") 
        }
    });
});