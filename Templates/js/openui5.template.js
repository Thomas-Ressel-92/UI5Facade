// Toggle online/offlie icon
window.addEventListener('online', function(){
	toggleOnlineIndicator();
});
window.addEventListener('offline', function(){
	toggleOnlineIndicator();
});

const exfLauncher = {
	_oShell : {},
	
	getShell : function() {
		return exfLauncher._oShell;
	},
	
	initShell : function() {
		var oShell = new sap.ui.unified.Shell({
			header: [
				new sap.m.OverflowToolbar({
		            design: "Transparent",
					content: [
						new sap.m.Button({
		                    icon: "sap-icon://menu2",
		                    layoutData: new sap.m.OverflowToolbarLayoutData({priority: "NeverOverflow"}),
		                    press: function() {
		                    	oShell.setShowPane(! oShell.getShowPane());
		            		}
		                }),
		                new sap.m.Image({
							src: "exface/vendor/exface/OpenUI5Template/Templates/images/sap_50x26.png",
							height: "26px",
							width: "50px",
							densityAware: false,
							//visible: ! sap.ui.Device.system.phone
		                }),
		                new sap.m.ToolbarSpacer(),
		                new sap.m.Label("exf_pagetitle", {
		                    text: "",
		                    design: "Bold",
		                    layoutData: new sap.m.OverflowToolbarLayoutData({priority: "NeverOverflow"})
		                }),
		                new sap.m.ToolbarSpacer(),
		                new sap.m.Button("exf-connection-indicator", {
		                    icon: function(){return navigator.onLine ? "sap-icon://connected" : "sap-icon://disconnected"}(),
		                    text: "3/1",
		                    layoutData: new sap.m.OverflowToolbarLayoutData({priority: "NeverOverflow"}),
		                    press: function(oEvent){
								var oButton = oEvent.getSource();
								var oPopover = new sap.m.Popover({
									title: "Akt. Status: Online",
									placement: "Bottom",
									content: [
										new sap.m.List({
											items: [
												new sap.m.StandardListItem({
													title: "Sync-Puffer (3)",
													type: "Active",
													press: function(){
														var oData = {
																data: [
																	{
																		"action_alias": "exfLauncher.Core.CreateData",
																		"caption": "Speichern",
																		"object_alias": "alexa.RMS-demo.BBD_ALERT",
																		"object_name": "MHD-Alarm",
																		"triggered": "2017-02-05 13:55:37"
																	},
																	{
																		"action_alias": "exfLauncher.Core.UpdateData",
																		"caption": "Speichern",
																		"object_alias": "axenox.WMS.picking_order_pos",
																		"object_name": "Pickauftragsposition",
																		"triggered": "2018-04-12 14:48:06"
																	},
																	{
																		"action_alias": "exfLauncher.Core.UpdateData",
																		"caption": "Speichern",
																		"object_alias": "axenox.WMS.picking_order_pos",
																		"object_name": "Pickauftragsposition",
																		"triggered": "2018-04-12 16:38:22"
																	}
																]
														};
														
														var oTable = new sap.m.Table({
															fixedLayout: false,
															mode: sap.m.ListMode.MultiSelect,
															headerToolbar: [
																new sap.m.OverflowToolbar({
																	design: "Transparent",
																	content: [
																		new sap.m.Label({
																			text: "Wartende Online-Aktionen"
																		}),
																		new sap.m.ToolbarSpacer(),
																		new sap.m.Button({
																			text: "Abbrechen",
																			icon: "sap-icon://cancel"
																		}),
																		new sap.m.Button({
																			text: "Exportieren",
																			icon: "sap-icon://download"
																		})
																	]
																})
															],
															columns: [
																new sap.m.Column({
																	header: [
																		new sap.m.Label({
																			text: "Objekt"
																		})
																	]
																}),
																new sap.m.Column({
																	header: [
																		new sap.m.Label({
																			text: "Aktion"
																		})
																	]
																}),
																new sap.m.Column({
																	header: [
																		new sap.m.Label({
																			text: "Alias"
																		})
																	],
																	minScreenWidth: "Tablet",
																	demandPopin: true
																}),
															],
															items: {
																path: "/data",
																template: new sap.m.ColumnListItem({
																	cells: [
																		new sap.m.Text({
																			text: "{object_name}"
																		}),
																		new sap.m.Text({
																			text: "{caption}"
																		}),
																		new sap.m.Text({
																			text: "{action_alias}"
																		})
																	]
																})
															}
														}).setModel(function(){return new sap.ui.model.json.JSONModel(oData)}());
														
														showDialog('Sync-Puffer', oTable, undefined, undefined, true);
													},
												}),
												new sap.m.StandardListItem({
													title: "Ausgecheckte Objekte (0)",
													type: "Active",
													press: function(){alert('click 2!')},
												}),
												new sap.m.StandardListItem({
													title: "Sync-Fehler (1)",
													type: "Active",
													press: function(){alert('click 3!')},
												})
											]
										})
									]
								});
								jQuery.sap.delayedCall(0, this, function () {
									oPopover.openBy(oButton);
								});
							}
		                }),
		                new sap.f.Avatar("exf_avatar", {
							displaySize: "XS",
							press: function(){
								window.location.href = 'login.html';
							}
		                })
					]
				})
			],
			content: [
		
			]
		});
		
		exfLauncher._oShell = oShell;
		return oShell;
	},

	showDialog : function (title, content, state, onCloseCallback, responsive) {
		var stretch = responsive ? jQuery.device.is.phone : false;
		var dialog = new sap.m.Dialog({
			title: title,
			state: state,
			stretch: stretch,
			content: content,
			beginButton: new sap.m.Button({
				text: 'OK',
				press: function () {
					dialog.close();
				}
			}),
			afterClose: function() {
				if (onCloseCallback) {
					onCloseCallback();
				}
				dialog.destroy();
			}
		});
	
		dialog.open();
	},

	showHtmlInDialog : function (title, html, state) {
		var content = new sap.ui.core.HTML({
			content: html
		});
		showDialog(title, content, state);
	},
	
	contextBar: {
		_oComponent : {},
		
		init : function (oComponent) {
			exfLauncher.contextBar._oComponent = oComponent;
			
			oComponent.getRouter().attachRouteMatched(function (oEvent){
				exfLauncher.contextBar.load();
			});
			
			$(document).ajaxSuccess(function(event, jqXHR, ajaxOptions, data){
				var extras = {};
				if (jqXHR.responseJSON){
					extras = jqXHR.responseJSON.extras;
				} else {
					try {
						extras = $.parseJSON(jqXHR.responseText).extras;
					} catch (err) {
						extras = {};
					}
				}
				if (extras && extras.ContextBar){
					exfLauncher.contextBar.refresh(extras.ContextBar);
				}
			});
		},
		
		getComponent : function() {
			return exfLauncher.contextBar._oComponent;
		},

		load : function(delay){
			if (delay == undefined) delay = 100;
			setTimeout(function(){
				// IDEA had to disable adding context bar extras to every request due to
				// performance issues. This will be needed for asynchronous contexts like
				// user messaging, external task management, etc. So put the line back in
				// place to fetch context data with every request instead of a dedicated one.
				// if ($.active == 0 && $('#contextBar .context-bar-spinner').length > 0){
				//if ($('#contextBar .context-bar-spinner').length > 0){
					$.ajax({
						type: 'POST',
						url: 'exface/api/ui5/' + exfLauncher.getPageId() + '/context',
						dataType: 'json',
						success: function(data, textStatus, jqXHR) {
							exfLauncher.contextBar.refresh(data);
						},
						error: function(jqXHR, textStatus, errorThrown){
							exfLauncher.contextBar.refresh({});
						}
					});
				/*} else {
					exfLauncher.contextBar.load(delay*3);
				}*/
			}, delay);
		},

		refresh : function(data){
			var oToolbar = exfLauncher.getShell().getHeader();
			var aItemsOld = exfLauncher.getShell().getHeader().getContent();
			var iItemsIndex = 5;
			var oControl = {};
			oToolbar.removeAllContent();
			
			for (var i=0; i<aItemsOld.length; i++) {
				oControl = aItemsOld[i];
				if (i < iItemsIndex || oControl.getId() == 'exf-connection-indicator' || oControl.getId() == 'exf_pagetitle' || oControl.getId() == 'exf_avatar') {
					oToolbar.addContent(oControl);
				} else {
					oControl.destroy();
				}
			}
			
			for (var id in data){
				var sColor = data[id].color ? 'background-color:'+data[id].color+' !important;' : '';
				oToolbar.insertContent(
						new sap.m.Button(id, { 
							icon: data[id].icon,
							tooltip: data[id].hint,
							text: data[id].indicator,
							press: function(oEvent) {
								var oButton = oEvent.getSource();
								exfLauncher.contextBar.showMenu(oButton);
							}
						}).data('widget', data[id].bar_widget_id, true), 
						iItemsIndex);
			}
		},

		showMenu : function (oButton){
			var sPopoverId = oButton.data('widget')+"_popover";
			var iPopoverWidth = "350px";
			var iPopoverHeight = "300px";
			var oPopover = sap.ui.getCore().byId(sPopoverId);
			if (oPopover) {
				return;
			} else {
				oPopover = new sap.m.Popover(sPopoverId, {
					title: oButton.getTooltip(),
					placement: "Bottom",
					busy: true,
					contentWidth: iPopoverWidth,
					contentHeight: iPopoverHeight,
					horizontalScrolling: false,
					afterClose: function(oEvent) {
						oEvent.getSource().destroy();
					},
					content: [
						new sap.m.NavContainer({
							pages: [
								new sap.m.Page({
									showHeader: false,
									content: [
										
									]
								})
							]
						})
					]
				}).setBusyIndicatorDelay(0);
				
				jQuery.sap.delayedCall(0, this, function () {
					oPopover.openBy(oButton);
				});
			}
			$.ajax({
				type: 'POST',
				url: 'exface/api/ui5',
				dataType: 'script',
				data: {
					action: 'exface.Core.ShowContextPopup',
					resource: exfLauncher.getPageId(),
					element: oButton.data('widget')
				},
				success: function(data, textStatus, jqXHR) {			
					var viewMatch = data.match(/sap.ui.jsview\("(.*)"/i);
		            if (viewMatch !== null) {
		                var view = viewMatch[1];
		                //$('body').append(data);
		            } else {
		            	showHtmlInDialog(text.Status, data);
		            }
		            
		            var oPopoverPage = oPopover.getContent()[0].getPages()[0];
		            oPopoverPage.removeAllContent();
		            
		            var oView = oComponent.runAsOwner(function() {
	            		return sap.ui.view({type:sap.ui.core.mvc.ViewType.JS, viewName:view});
            		}); 
	            	oPopoverPage.addContent(oView);
		        	oPopover.setBusy(false);
					
				},
				error: function(jqXHR, textStatus, errorThrown){
					oButton.setBusy(false);
					exfLauncher.showHtmlInDialog(textStatus, jqXHR.responseText, "error");
				}
			});
		}
	},

	getPageId : function(){
		return $("meta[name='page_id']").attr("content");
	},

	toggleOnlineIndicator : function() {
		sap.ui.getCore().byId('exf-connection-indicator').setIcon(navigator.onLine ? 'sap-icon://connected' : 'sap-icon://disconnected');
		if (navigator.onLine) {
			exfLauncher.contextBar.load();
		}
	}
}