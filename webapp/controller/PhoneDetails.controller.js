sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.PhoneDetails", {
    onInit() {

        sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutePhoneDetailsPage").attachPatternMatched(this._objPatternMatched,this);
    
    // Ram Storage view Fragment Calling
    if(!this.RamStorage){
            this.RamStorage = new sap.ui.xmlfragment("ladera.mobiles.view.RamStorage",this);
            this.getView().addDependent(this.RamStorage);
        }  

    },
    _objPatternMatched:function(oEvent){
        var that = this;
        var GetModelName = oEvent.getParameter("arguments").ModelName;

        var oData = this.getOwnerComponent().oModels.Specification.getData();
        var record = oData[GetModelName];
        
        if (record) {
            var modelData = {
                    ...record, // Spread the record data
                    modelName: GetModelName // Add GetModelName to the model
                };
                    var getValue = new sap.ui.model.json.JSONModel(modelData);
                    var tableIds = ["iphoneSpecTable", "iphoneSpecTable1", "iphoneSpecTable2", "iphoneSpecTable3", "iphoneSpecTable4","iPhoneFullImage"];
                    tableIds.forEach(id => {
                    this.getView().byId(id).setModel(getValue, "phoneData");
                    });
                    this.getView().setModel(getValue, "phoneData");
                    console.log("Record found:", record);
                } else {
                    console.log("No record found for model: " + GetModelName);
                }

    },
    
    //Ram Storage view Fragment Open
    onRamStoragePress: function() {

        var PhoneModel = this.getView().oModels.phoneData.oData.modelName;
        var oData = this.getOwnerComponent().oModels.RSPDetails.getData();
        var response = new sap.ui.model.json.JSONModel(oData[PhoneModel]);
        this.getView().setModel(response, "phoneModelRSdetails");
        this.RamStorage.open();
    },

    // RAM Storage view Fragment ok
    onCheckPrice: function(oEvent) {
        var oTable = sap.ui.getCore().byId("radioButtonTable").getSelectedItem().getBindingContext("phoneModelRSdetails");
        var oSelectedData = oTable.getObject();
        var SelectedModelPrice = new sap.ui.model.json.JSONModel({ price: oSelectedData.PriceINR });
        this.getView().byId("AmountField").setModel(SelectedModelPrice, "SelectedModelPrice");

        // Update the text binding (optional, if you want to set text directly)
        this.getView().byId("AmountField").setText(oSelectedData.PriceINR.toString());

        // Close the dialog
        this.RamStorage.close();
    },

    // RAM Storage view Fragment Cancel 
    onCancel: function() {
        this.RamStorage.close();
    },

// Navigation Back to Phone Page
    onNavBackPhonePage: function () {
        var oHistory = sap.ui.core.routing.History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1); // Navigate back in browser history
        } else {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePhonePage", {}, true); // Navigate to a default route if no history exists
        }
    }


    });
});