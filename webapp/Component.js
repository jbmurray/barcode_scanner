jQuery.sap.declare("jm.scanner.Component");
jQuery.sap.require("jm.scanner.MyRouter");

sap.ui.core.UIComponent.extend("jm.scanner.Component", {
	metadata : {
		name : "Barcode Test",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},

		rootView : "jm.scanner.view.App",

		config : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "Honda",
				proxiedServiceUrl : "/proxy/ODATAORG/V2/(S(jbm1991))/OData/OData.svc/",
				fullServiceUrl: "http://services.odata.org/V2/(S(jbm1991))/OData/OData.svc/"
			}
		},

		routing : {
			config : {
				routerClass : jm.scanner.MyRouter,
				viewType : "XML",
				viewPath : "jm.scanner.view",
				targetAggregation : "detailPages",
				clearTarget : false
			},
			routes : [
				{
					pattern : "",
					name : "main",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : "{product}/:tab:",
							name : "product",
							view : "Detail"
						}
					]
				},
				{
					name : "catchallMaster",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : ":all*:",
							name : "catchallDetail",
							view : "NotFound",
							transition : "show"
						}
					]
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("jm.scanner");

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// set device model
		var bIsPhone = sap.ui.Device.system.phone;
		var bIsMobile = !sap.ui.Device.system.desktop;
		var oDeviceModel = new sap.ui.model.json.JSONModel({
			isPhone : bIsPhone,
			isNoPhone : !bIsPhone,
			isMobile: bIsMobile,
			listMode : bIsPhone ? "None" : "SingleSelectMaster",
			listItemType : bIsPhone ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");

		var sProxyServiceUrl = mConfig.serviceConfig.proxiedServiceUrl;
		var sFullServiceUrl = mConfig.serviceConfig.fullServiceUrl;
		if(bIsMobile){
			var sServiceUrl = sFullServiceUrl;
		} else {
			var sServiceUrl = sProxyServiceUrl;
		}

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		this.getRouter().initialize();

	}

});
