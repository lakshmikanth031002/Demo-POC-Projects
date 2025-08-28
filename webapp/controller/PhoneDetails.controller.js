sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment"
], (Controller, MessageToast, Filter, Fragment) => {
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

            this._selectedVariant = oSelectedData.RAM + " / " + oSelectedData.Storage;

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

        // Add to Cart Pop Over Call
        onAddToCartPopOverCall: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            var sProductName = oView.getModel("phoneData").getProperty("/modelName");
            var sProductPrice = oView.byId("AmountField").getText();
            var sVariant = this._selectedVariant;

            if (sProductPrice) {

                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "ladera.mobiles.view.QuantitySelect",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("/ProductCollection/0");
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {

                    Fragment.byId(oView.getId(), "productNameText").setText(sProductName);
                    Fragment.byId(oView.getId(), "productPriceText").setText(sProductPrice);
                    Fragment.byId(oView.getId(), "variantText").setText(sVariant);

                    oPopover.openBy(oButton);
                });

            } else {

                sap.m.MessageToast.show("Please Select the Varient(Ram/Storage)!");
            }


        },

        // Add to Cart
        onAddToCartPress: function () {

            var oView = this.getView();
            var oFragmentId = oView.getId();

            var sProductName = Fragment.byId(oFragmentId, "productNameText").getText();
            var sVariant = Fragment.byId(oFragmentId, "variantText").getText();
            var sPrice = Fragment.byId(oFragmentId, "productPriceText").getText();
            var sQuantity = Fragment.byId(oFragmentId, "quantityInput").getValue();

            if (typeof sPrice === "string") {
                const rawPrice = sPrice.replace(/[₹,~]/g, "");
                var numericPrice = parseInt(rawPrice, 10);
            }

            if (!sQuantity || isNaN(sQuantity) || parseInt(sQuantity) <= 0) {
                sap.m.MessageToast.show("Please enter a valid quantity");
                return;
            }

            var iQuantity = parseInt(sQuantity);

            var oProductData = oView.getModel("phoneData").getData();
            var sImage = oProductData[0].imageUrl; // Because phoneData>0/imageUrl
            var oCartItem = {
                image: sImage,
                name: sProductName,
                varient: sVariant,
                price: sPrice,
                Quantity: iQuantity,
                priceQuantity: numericPrice * iQuantity
            };

            // Add to cart model
            var oCartModel = this.getOwnerComponent().getModel("cartModel");
            var aCartItems = oCartModel.getProperty("/cartItems") || [];
            aCartItems.push(oCartItem);
            oCartModel.setProperty("/cartItems", aCartItems);

            // Calculate total amount
            var iTotal = aCartItems.reduce((sum, item) => {
                return sum + item.priceQuantity;
            }, 0);
            oCartModel.setProperty("/totalAmount", iTotal);

            // Show confirmation
            sap.m.MessageToast.show("Added to cart!");

            // Close the popover
            this.byId("addToCartPopover").close();

        },


        // Add to Cart PopOver Close
        onAddToCartCancelPress: function () {
            this.byId("addToCartPopover").close();
        },

        // Fragment Open Comparison
        onComparisonPress: function () {

            if (this._selectedVariant) {

                var sVariant = this._selectedVariant;
                var phone1Data = {

                    image: this.getView().oModels.phoneData.oData[0].imageUrl,
                    name: this.getView().oModels.phoneData.oData.modelName,
                    varient: sVariant,
                    price: this.getView().byId("AmountField").getText(),
                    processor: this.getView().oModels.phoneData.oData[0].keyspec[0].value,
                    battery: this.getView().oModels.phoneData.oData[0].battery[0].value,
                    display: this.getView().oModels.phoneData.oData[0].display[0].value,
                    refreshrate: this.getView().oModels.phoneData.oData[0].display[3].value,
                    height: this.getView().oModels.phoneData.oData[0].design[0].value,
                    width: this.getView().oModels.phoneData.oData[0].design[1].value,
                    thickness: this.getView().oModels.phoneData.oData[0].design[2].value,
                    weight: this.getView().oModels.phoneData.oData[0].design[3].value

                }

                var Model = new sap.ui.model.json.JSONModel(phone1Data);
                this.getView().setModel(Model, "Phone1");

                if (!this.Comparison) {
                    this.Comparison = new sap.ui.xmlfragment("ladera.mobiles.view.Comparison", this);
                    this.getView().addDependent(this.Comparison);
                }
                console.log(this.Comparison);
                this.Comparison.open();

            } else {
                sap.m.MessageToast.show("Please Select the Varient(Ram/Storage)!");
            }


        },

        // Search Compare Prodcut
        onSearchCompareProduct: function (evt) {
            var searchPhone = evt.getParameter("value");
            var oData = this.getOwnerComponent().oModels.Specification.getData();
            var record = oData[searchPhone];

            var phone2Data = {

                    image: record[0].imageUrl,
                    name: searchPhone,
                    varient: sVariant,
                    price: this.getView().byId("AmountField").getText(),
                    processor: record[0].keyspec[0].value,
                    battery:record[0].battery[0].value,
                    display: record[0].display[0].value,
                    refreshrate: record[0].display[3].value,
                    height: record[0].design[0].value,
                    width: record[0].design[1].value,
                    thickness: record[0].design[2].value,
                    weight:record[0].design[3].value 

                }

                var Model2 = new sap.ui.model.json.JSONModel(phone2Data);
                this.getView().setModel(Model2, "Phone2");

        },

        // Close the Compare Fragment
        onCloseComparefragment: function () {
            this.Comparison.close();
        }




    });
});