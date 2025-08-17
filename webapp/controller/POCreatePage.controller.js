sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("ladera.mobiles.controller.POCreatePage", {

  // View Initialization
    onInit: function () {
      const oModel = new JSONModel({
        OrderItems: []
      });
      this.getView().setModel(oModel);

  // Optional: Hide initially if switch is off
        this.byId("currentOrderRow").setVisible(false);
        this.byId("vatAmountRow").setVisible(false);
        this.byId("amountExVatRow").setVisible(false);
        this.byId("amountInVatRow").setVisible(false);
    },

    // Add Row to Table
    onAddRow: function () {
      const oModel = this.getView().getModel();
      const aItems = oModel.getProperty("/OrderItems");

      const lastSeq = aItems.length > 0 ? parseInt(aItems[aItems.length - 1].Seq) : 0;
      const newSeq = lastSeq + 10;

      aItems.push({
        Seq: String(newSeq),
        Part: "",
        Quantity: "",
        InStock: "",
        ETA: "",
        MSRP: "",
        DealerPrice: "",
        Vat: "",
        Amount: ""
      });

      oModel.setProperty("/OrderItems", aItems);

      const count = aItems.length;
      oModel.setProperty("/SeqCount", count);
    },

    // Remove Selected Rows
    onRemoveRow: function () {
      const oTable = this.byId("stockTable");
      const oModel = this.getView().getModel();
      const aData = oModel.getProperty("/OrderItems");

      const aSelectedIndices = oTable.getSelectedIndices();

      if (aSelectedIndices.length === 0) {
        sap.m.MessageToast.show("Please select at least one row to remove.");
        return;
      }

      const aIndexes = aSelectedIndices.map(function (iIndex) {
        const oContext = oTable.getContextByIndex(iIndex);
        return parseInt(oContext.getPath().split("/").pop());
      });

      aIndexes.sort(function (a, b) {
        return b - a;
      });

      aIndexes.forEach(function (iIndex) {
        aData.splice(iIndex, 1);
      });

      oModel.setProperty("/OrderItems", aData);
      oTable.clearSelection();
      oModel.setProperty("/SeqCount", aData.length);
    },

// Enable Unit Price Switch Logic
  onToggleUnitPrice: function (oEvent) {
      var bState = oEvent.getParameter("state"); // true = green, false = red
      // Get fields by ID
      this.byId("currentOrderRow").setVisible(bState);
      this.byId("vatAmountRow").setVisible(bState);
      this.byId("amountExVatRow").setVisible(bState);
      this.byId("amountInVatRow").setVisible(bState);
  },

// Radio Selected Manual Section or Excel Upload Section
    onRadioSelect: function (oEvent) {
        const selectedIndex = oEvent.getSource().getSelectedIndex();
        if (selectedIndex === 0) {
            this.byId("manualSection").setVisible(true);
            this.byId("excelUploadSection").setVisible(false);
          
        } else {
              this.byId("manualSection").setVisible(true);
              this.byId("excelUploadSection").setVisible(true);
        }
        
}


  });
});
