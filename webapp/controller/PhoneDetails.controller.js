sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
], (Controller, MessageToast, Filter) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.PhoneDetails", {
        onInit() {

            sap.ui.core.UIComponent.getRouterFor(this).getRoute("RoutePhoneDetailsPage").attachPatternMatched(this._objPatternMatched, this);

            // Ram Storage view Fragment Calling
            if (!this.RamStorage) {
                this.RamStorage = new sap.ui.xmlfragment("ladera.mobiles.view.RamStorage", this);
                this.getView().addDependent(this.RamStorage);
            }

        },
        _objPatternMatched: function (oEvent) {

            // Clear the Amount value
            this.getView().byId("AmountField").setText("");

            var GetModelName = oEvent.getParameter("arguments").ModelName;
            var oData = this.getOwnerComponent().oModels.Specification.getData();
            var record = oData[GetModelName];

            if (record) {
                var modelData = {
                    ...record, // Spread the record data
                    modelName: GetModelName // Add GetModelName to the model
                };
                var getValue = new sap.ui.model.json.JSONModel(modelData);
                var tableIds = ["iphoneSpecTable", "iphoneSpecTable1", "iphoneSpecTable2", "iphoneSpecTable3", "iphoneSpecTable4", "iPhoneFullImage"];
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
        onRamStoragePress: function () {
            var PhoneModel = this.getView().oModels.phoneData.oData.modelName;
            var oData = this.getOwnerComponent().oModels.RSPDetails.getData();
            var response = new sap.ui.model.json.JSONModel(oData[PhoneModel]);
            this.getView().setModel(response, "phoneModelRSdetails");
            this.RamStorage.open();
        },

        // RAM Storage view Fragment ok
        onCheckPrice: function (oEvent) {
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
        onCancel: function () {
            this.RamStorage.close();
        },

        // Navigation Back to Phone Page
        onNavBackPhonePage: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePhonePage", {}, true);
        },

        // Navigation to Cart Page
        onCheckCartPress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCartPage");
        },

        // Add to Cart
        onAddToCartPress: function () {

            var oView = this.getView();

            // Get the cart model
            var oCartModel = this.getOwnerComponent().getModel("cartModel");
            var aCartItems = oCartModel.getProperty("/cartItems");

            // Get product details
            var oProductData = oView.getModel("phoneData").getData();
            var sImage = oProductData[0].imageUrl;
            var sName = oProductData.modelName;
            var sPrice = oView.byId("AmountField").getText();

            var oNewItem = {
                image: sImage,
                name: sName,
                price: sPrice
            };

            // Push to cart
            aCartItems.push(oNewItem);
            oCartModel.setProperty("/cartItems", aCartItems);

            // Optional: Toast message
            sap.m.MessageToast.show("Added to cart!");

        },

        // Fragment Open Comparison
        onComparisonPress: function () {
            this.oModel = this.getOwnerComponent().oModels.Phones.Images
            var oView = this.getView();
            oView.setModel(this.oModel);
            this.oSF = oView.byId("searchField");

            if (!this.Comparison) {
                this.Comparison = new sap.ui.xmlfragment("ladera.mobiles.view.Comparison", this);
                this.getView().addDependent(this.Comparison);
            }
            console.log(this.Comparison);
            this.Comparison.open();

        },

        // Fragment Search Validation
        onSearch: function (event) {
            var oItem = event.getParameter("suggestionItem");
            if (oItem) {
                MessageToast.show("Search for: " + oItem.getText());
            } else {
                MessageToast.show("Search is fired!");
            }
        },

        onSuggest: function (event) {
            var sValue = event.getParameter("query"),
                aFilters = [];

            if (sValue) {
                aFilters = [
                    new Filter([
                        new Filter("ProductId", function (sText) {
                            return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        }),
                        new Filter("Name", function (sDes) {
                            return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                        })
                    ], false)
                ];
            }

            var oSearchField = event.getSource();
            oSearchField.getBinding("suggestionItems").filter(aFilters);
            oSearchField.suggest();
        }


    });
});