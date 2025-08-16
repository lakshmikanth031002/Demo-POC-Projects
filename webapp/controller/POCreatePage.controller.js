sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
  "use strict";

  return Controller.extend("ladera.mobiles.controller.POCreatePage", {
    onInit: function () {
      const oModel = new JSONModel({
        OrderItems: [
          { Seq: "10", Part: "", Quantity: "", InStock: "", ETA: "", MSRP: "" },
          { Seq: "20", Part: "", Quantity: "", InStock: "", ETA: "", MSRP: "" }
        ]
      });
      this.getView().setModel(oModel);
    },

    onAddRow: function () {
      const oModel = this.getView().getModel();
      const aItems = oModel.getProperty("/OrderItems");
      const newSeq = (aItems.length + 1) * 10;

      aItems.push({ Seq: String(newSeq), Part: "", Quantity: "", InStock: "", ETA: "", MSRP: "" });
      oModel.setProperty("/OrderItems", aItems);
    }
  });
});
