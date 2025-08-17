sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.LoginPage", {
        onInit() {
        },
        onShowPassword: function (oEvent) {
            var bSelected = oEvent.getParameter("selected");
            this.byId("passwordInput").setType(bSelected ? "Text" : "Password");
        },
        onLoginPress : function() {

            var sUsername = this.byId("usernameInput").getValue();
            var sPassword = this.byId("passwordInput").getValue();
            if (sUsername && sPassword) {
                sap.m.MessageToast.show("Logging in...");
            } else {
                sap.m.MessageToast.show("Please enter both username and password.");
            }

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainPage")  

        }
    });
});