sap.ui.define([
    "sap/ui/core/UIComponent",
    "ladera/mobiles/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("ladera.mobiles.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();


            // Cart Model Json Value
            var oCartModel = new sap.ui.model.json.JSONModel({
                cartItems: []
            });

            this.setModel(oCartModel, "cartModel");


            

        }
    });
});