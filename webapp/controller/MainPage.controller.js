sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ladera.mobiles.controller.MainPage", {
    onInit() {

        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        const oTarget = oRouter.getTarget("LoginPage"); // must match the 'name' in manifest.json route config
            if (oTarget) {
                oTarget.attachDisplay(this._onViewVisible, this);
                oTarget.attachHide(this._onViewHidden, this);
            }
    },

// Video Autopaly and Autopause Code 
    _onViewVisible: function () {
            const oVideo = this._getVideoDom();
            if (oVideo) {
                oVideo.play();
            }
        },
        _onViewHidden: function () {
            const oVideo = this._getVideoDom();
            if (oVideo) {
                oVideo.pause();
            }
        },
        _getVideoDom: function () {
            const oHTML = this.byId("videoPlayer");
            if (oHTML) {
                const oDomRef = oHTML.getDomRef();
                return oDomRef ? oDomRef.querySelector("#myVideo") : null;
            }
            return null;
        },
    

// Navigation to CatalogPage
    onPressCatalogOrder: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteCatalogOrderPage") 
    },

// Navigation to PurchaseOrder Create Page
    onPurchaseOrderCreate: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RoutePOCreatePage")
    }    
    });
});