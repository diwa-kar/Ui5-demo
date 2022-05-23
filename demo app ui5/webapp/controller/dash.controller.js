sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("DemoUI5.controller.dash", {

		onInit: function() {
			
			var sModel = sap.ui.getCore().getModel('baseInfo');
			var myData = sModel.getData();
			var arr = [];
			var oTableId = this.getView().byId("empTable");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(arr);
			oTableId.setModel(oModel);
			var oTab = this.getView().byId("empTable").getModel().getProperty("/");
			oTab.push(myData);
			this.getView().byId("empTable").getModel().setProperty("/", oTab);
		}
		

	});

});