/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Table',"./TableRenderer",'sap/ui/model/ClientTreeBindingAdapter','sap/ui/model/TreeBindingCompatibilityAdapter','./library','sap/ui/core/Element','./utils/TableUtils',"./plugins/BindingSelectionPlugin","sap/base/Log","sap/base/assert"],function(T,a,C,b,l,E,c,B,L,d){"use strict";var e=T.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false,deprecated:true},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},rootLevel:{type:"int",group:"Data",defaultValue:0}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:"sap.ui.table.TableRenderer"});e.prototype.init=function(){T.prototype.init.apply(this,arguments);c.Grouping.setTreeMode(this);};e.prototype.bindRows=function(o){o=T._getSanitizedBindingInfo(arguments);if(o){if(!o.parameters){o.parameters={};}o.parameters.rootLevel=this.getRootLevel();o.parameters.collapseRecursive=this.getCollapseRecursive();if(!("numberOfExpandedLevels"in o.parameters)){o.parameters.numberOfExpandedLevels=this.getExpandFirstLevel()?1:0;}}return T.prototype.bindRows.call(this,o);};e.prototype.setFixedRowCount=function(r){L.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this;};e.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true;}return E.prototype.isTreeBinding.apply(this,arguments);};e.prototype.getBinding=function(n){n=n||"rows";var o=E.prototype.getBinding.call(this,n);if(o&&n==="rows"&&!o.getLength){if(o.isA("sap.ui.model.odata.ODataTreeBinding")){b(o,this);}else if(o.isA("sap.ui.model.odata.v2.ODataTreeBinding")){o.applyAdapterInterface();}else if(o.isA("sap.ui.model.ClientTreeBinding")){C.apply(o);}else{L.error("Binding not supported by sap.ui.table.TreeTable");}}return o;};e.prototype._getContexts=function(s,i,t){var o=this.getBinding("rows");if(o){return o.getNodes(s,i,t);}else{return[];}};e.prototype._onGroupHeaderChanged=function(r,f){this.fireToggleOpenState({rowIndex:r,rowContext:this.getContextByIndex(r),expanded:f});};e.prototype.expand=function(r){c.Grouping.toggleGroupHeader(this,r,true);return this;};e.prototype.collapse=function(r){c.Grouping.toggleGroupHeader(this,r,false);return this;};e.prototype.collapseAll=function(){var o=this.getBinding("rows");if(o){o.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};e.prototype.expandToLevel=function(i){var o=this.getBinding("rows");d(o&&o.expandToLevel,"TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(o&&o.expandToLevel){o.expandToLevel(i);}return this;};e.prototype.isExpanded=function(r){var o=this.getBinding("rows");if(o){return o.isExpanded(r);}return false;};e.prototype.getContextByIndex=function(r){var o=this.getBinding("rows");if(o){return o.getContextByIndex(r);}};e.prototype.setRootLevel=function(r){this.setFirstVisibleRow(0);var o=this.getBinding("rows");if(o){d(o.setRootLevel,"rootLevel is not supported by the used binding");if(o.setRootLevel){o.setRootLevel(r);}}this.setProperty("rootLevel",r,true);return this;};e.prototype.setCollapseRecursive=function(f){var o=this.getBinding("rows");if(o){d(o.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(o.setCollapseRecursive){o.setCollapseRecursive(f);}}this.setProperty("collapseRecursive",!!f,true);return this;};e.prototype.setUseGroupMode=function(g){this.setProperty("useGroupMode",!!g);if(!!g){c.Grouping.setGroupMode(this);}else{c.Grouping.setTreeMode(this);}return this;};e.prototype.setEnableGrouping=function(){L.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");return this;};e.prototype.setGroupBy=function(){L.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");return this;};e.prototype.setUseFlatMode=function(f){f=!!f;if(f!=this._bFlatMode){this._bFlatMode=f;if(this.getDomRef()&&c.Grouping.isTreeMode(this)){this.invalidate();}}return this;};e.prototype._createLegacySelectionPlugin=function(){return new B(this);};return e;});
