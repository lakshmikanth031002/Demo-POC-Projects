sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.PhonePage", {
        onInit() {

           var oData = this.getOwnerComponent().oModels.Phones.oData;
           var aImages = [];
           oData.forEach(function (phone) {
                    if (phone.images && phone.images.length) {
                        aImages = aImages.concat(phone.images);
                    }
                });

            var oImagesModel = new sap.ui.model.json.JSONModel(aImages);
            this.getView().byId("Flexboxvalue").setModel(oImagesModel, "Images");

        },

        onSelectionChange: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            var oData = this.getView().getModel("Phones").getData();
            var aImages = [];

            if (sSelectedKey === "AllModels") {
                // Flatten all images arrays into one array
                oData.forEach(function (phone) {
                    if (phone.images && phone.images.length) {
                        aImages = aImages.concat(phone.images);
                    }
                });
            } else {

                // Find images for selected phone
                var selectedPhone = oData.find(function (phone) {
                    return phone.key === sSelectedKey;
                });
                if (selectedPhone && selectedPhone.images) {
                    aImages = selectedPhone.images;
                }
            }
            var oImagesModel = new sap.ui.model.json.JSONModel(aImages);
            this.getView().byId("Flexboxvalue").setModel(oImagesModel, "Images");

        },

// Navigation Phone Details page 
        onCategoryPress: function (oEvent) {
            var SelectedModel = oEvent.getSource().mProperties.header;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePhoneDetailsPage", { "ModelName": SelectedModel })
        },

        // Navigation Back to Catalog Page
        onNavBackCatalogPage: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCatalogOrderPage", {}, true);
        }

    });
});