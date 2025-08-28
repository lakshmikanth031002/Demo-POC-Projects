sap.ui.define([
  "sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
  "use strict";

  return {
    formatINRCurrency: function (value) {
      if (!value) return "₹0";
      const oFormat = NumberFormat.getFloatInstance({
        groupingEnabled: true,
        groupingSeparator: ",",
        decimalSeparator: "."
      });
      return "₹" + oFormat.format(value);
    }
  };
});
