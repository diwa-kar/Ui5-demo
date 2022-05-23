sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast"

], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("DemoUI5.controller.login", {
		onInit: function() {
			window.console.log("Initialized");

		},

		OnLogin: function() {

			var studid = this.getView().byId("studid").getValue();
			var pwd = this.getView().byId("pwd").getValue();

			if (studid !== "" && pwd !== "") {
				var surl = "/sap/opu/odata/sap/ZD_ODTA_UI5_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(surl, true);
				//window.console.log(surl);
				//window.console.log(oModel);
				var uri = "StudentId='" + studid + "',StuPwd='" + pwd + "'";
				window.console.log(uri);
				var statuscode;
				var STUDENT_ID, STUDENT_NAME, STUDENT_ADDRESS, STUDENT_MOBILE, STUDENT_DEPT;

				oModel.read("/ZDTABLE_UI5Set(" + uri + ")", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {

						statuscode = oResponse["statusCode"];
						window.console.log(statuscode);
						STUDENT_ID = oData["StudentId"];
						STUDENT_NAME = oData["StudentName"];
						STUDENT_MOBILE = oData["StudentMobile"];
						STUDENT_ADDRESS = oData["StudentAddress"];
						STUDENT_DEPT = oData["StuDept"];

					}
				});
				var details = {
					"StudentId": STUDENT_ID,
					"StudentName": STUDENT_NAME,
					"StudentMobile": STUDENT_MOBILE,
					"StudentAddress": STUDENT_ADDRESS,
					"StuDept": STUDENT_DEPT
				};
				var sampleModel = new sap.ui.model.json.JSONModel(details);
				sap.ui.getCore().setModel(sampleModel, 'baseInfo');
				window.console.log("statuscode");
				window.console.log(statuscode);

				if (statuscode === 200) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("dash");
				} else {
					MessageBox.alert("Not a valid Username");
				}
			} else {
				MessageBox.alert("Fill required fields");
			}
		},
		OnClear: function() {
			this.getView().byId("studid").setValue("");
			this.getView().byId("pwd").setValue("");
		}

	});

});