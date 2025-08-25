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
        onLoginPress: function () {

            var oUsernameInput = this.byId("usernameInput");
            var oPasswordInput = this.byId("passwordInput");

            var sUsername = oUsernameInput.getValue();
            var sPassword = oPasswordInput.getValue();

            if (!sUsername || !sPassword) {
                sap.m.MessageToast.show("Please enter both username and password.");
                return;
            }

            if (sUsername === "TECH_23" && sPassword === "LADERA") {
                sap.m.MessageToast.show("Logging in...");

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMainPage");
            } else {
                sap.m.MessageToast.show("Invalid username or password. Please try again.");

                oUsernameInput.setValue("");
                oPasswordInput.setValue("");
            }
        }


    });
});