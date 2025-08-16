sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.PhonePage", {
    onInit() {
        
    },

    onSelectionChange: function (oEvent) {

            var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            var oModel = this.getView().getModel("Phones");
            var oData = oModel.getData();

            var SelectedImages =new sap.ui.model.json.JSONModel(oData.find(item => item.key === sSelectedKey).images);
            // oData.selectedImage = SelectedImages;
            this.getView().byId("Flexboxvalue").setModel(SelectedImages, "Images");
            oModel.refresh(); 
        },
    onCategoryPress:function (oEvent) {
            var SelectedModel = oEvent.getSource().mProperties.header;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePhoneDetailsPage",{"ModelName": SelectedModel})  
    }


    });
});