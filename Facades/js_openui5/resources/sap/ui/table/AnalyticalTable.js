/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./AnalyticalColumn','./Table','./TreeTable',"./TableRenderer",'./library','sap/ui/model/analytics/ODataModelAdapter','sap/ui/model/SelectionModel','sap/ui/model/Sorter','sap/ui/unified/Menu','sap/ui/unified/MenuItem','./utils/TableUtils',"./plugins/BindingSelectionPlugin","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery","sap/base/util/UriParameters"],function(A,T,a,b,c,O,S,d,M,e,f,B,L,g,q,U){"use strict";var G=c.GroupEventType,h=c.SortOrder,k=c.TreeAutoExpandMode;var m=T.extend("sap.ui.table.AnalyticalTable",{metadata:{library:"sap.ui.table",properties:{sumOnTop:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},numberOfExpandedLevels:{type:"int",group:"Misc",defaultValue:0,deprecated:true},autoExpandMode:{type:"string",group:"Misc",defaultValue:"Bundled",deprecated:true},columnVisibilityMenuSorter:{type:"any",group:"Appearance",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},dirty:{type:"boolean",group:"Appearance",defaultValue:null,deprecated:true}},designtime:"sap/ui/table/designtime/AnalyticalTable.designtime"},renderer:"sap.ui.table.TableRenderer"});m.prototype._getFixedBottomRowContexts=function(){var o=this.getBinding("rows");if(o){return[o.getGrandTotalNode()];}};m.prototype._getContexts=a.prototype._getContexts;m.prototype.init=function(){T.prototype.init.apply(this,arguments);this.addStyleClass("sapUiAnalyticalTable");this.setShowColumnVisibilityMenu(true);this.setEnableColumnFreeze(true);this.setEnableCellFilter(true);this._aGroupedColumns=[];this._bSuspendUpdateAnalyticalInfo=false;f.Grouping.setGroupMode(this);};m.prototype.exit=function(){this._cleanupGroupHeaderMenu();T.prototype.exit.apply(this,arguments);};m.prototype._adaptLocalization=function(r,l){return T.prototype._adaptLocalization.apply(this,arguments).then(function(){if(l){this._cleanupGroupHeaderMenu();}}.bind(this));};m.prototype.setFixedRowCount=function(){L.error("The property fixedRowCount is not supported by control sap.ui.table.AnalyticalTable!");return this;};m.prototype.setFixedBottomRowCount=function(){L.error("The property fixedBottomRowCount is managed by control sap.ui.table.AnalyticalTable!");return this;};m.prototype.setDirty=function(D){L.error("The property dirty of control sap.ui.table.AnalyticalTable is deprecated. Please use showOverlay instead.");this.setProperty("dirty",D,true);this.setShowOverlay(this.getDirty());return this;};m.prototype.setEnableGrouping=function(){L.error("The property enableGrouping is not supported by the sap.ui.table.AnalyticalTable control");return this;};m.prototype.setGroupBy=function(){L.warning("The groupBy association is not supported by the sap.ui.table.AnalyticalTable control");return this;};m.prototype.getModel=function(n){var o=T.prototype.getModel.apply(this,arguments);var r=this.getBindingInfo("rows");if(o&&r&&r.model==n){O.apply(o);}return o;};m.prototype._onBindingChange=function(E){T.prototype._onBindingChange.apply(this,arguments);var r=typeof(E)==="object"?E.getParameter("reason"):E;if(r!=="sort"){this._invalidateColumnMenus();}};m.prototype._bindAggregation=function(n,o){if(n==="rows"){this.setProperty("firstVisibleRow",0,true);this._applyAnalyticalBindingInfo(o);this._updateTotalRow(true);this._applyODataModelAnalyticalAdapter(o.model);}T.prototype._bindAggregation.call(this,n,o);if(n==="rows"){f.Binding.metadataLoaded(this).then(function(){this._updateColumns(true);}.bind(this));}};m.prototype._applyAnalyticalBindingInfo=function(o){var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getSorted()){o.sorter=o.sorter||[];o.sorter.push(new d(C[i].getSortProperty()||C[i].getLeadingProperty(),C[i].getSortOrder()===h.Descending));}}o.parameters=o.parameters||{};o.parameters.analyticalInfo=this._getColumnInformation();if(!o.parameters.hasOwnProperty("sumOnTop")){o.parameters.sumOnTop=this.getSumOnTop();}if(!o.parameters.hasOwnProperty("numberOfExpandedLevels")){o.parameters.numberOfExpandedLevels=this.getNumberOfExpandedLevels();}if(o.parameters.numberOfExpandedLevels>this._aGroupedColumns.length){o.parameters.numberOfExpandedLevels=0;}if(!o.parameters.hasOwnProperty("autoExpandMode")){var E=this.getAutoExpandMode();if(E!=k.Bundled&&E!=k.Sequential){E=k.Bundled;}o.parameters.autoExpandMode=E;}};m.prototype._applyODataModelAnalyticalAdapter=function(o){if(o){O.apply(o);}};m.prototype._getColumnInformation=function(){var C=[],t=this.getColumns();for(var i=0;i<this._aGroupedColumns.length;i++){var o=sap.ui.getCore().byId(this._aGroupedColumns[i]);if(!o){continue;}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}for(var i=0;i<t.length;i++){var o=t[i];if(this._aGroupedColumns.indexOf(o.getId())>-1){continue;}if(!o instanceof A){L.error("You have to use AnalyticalColumns for the Analytical table");}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}return C;};m.prototype._updateTableContent=function(){var o=this.getBinding("rows");var r=this._getRowCounts();var R=this.getRows();var i;if(!o){for(i=0;i<R.length;i++){f.Grouping.cleanupTableRowForGrouping(this,R[i]);}return;}var l=this.getBindingInfo("rows");var t=this._getTotalRowCount()>r.count;for(i=0;i<R.length;i++){var I=i>(r.count-r.fixedBottom-1)&&t;var n=R[i];var p=n.getIndex();var C;if(I&&o.bProvideGrandTotals){C=o.getGrandTotalContextInfo();}else{C=this.getContextInfoByIndex(p);}var s=C?C.level:0;if(!C||!C.context){f.Grouping.cleanupTableRowForGrouping(this,n);continue;}if(o.nodeHasChildren&&o.nodeHasChildren(C)){f.Grouping.updateTableRowForGrouping(this,n,true,C.nodeState.expanded,C.nodeState.expanded&&!l.parameters.sumOnTop,false,s,o.getGroupName(C.context,C.level));}else{f.Grouping.updateTableRowForGrouping(this,n,false,false,false,C.nodeState.sum,s,C.nodeState.sum&&C.level>0?o.getGroupName(C.context,C.level):null);}var u=n.getCells();var v=u.length;for(var j=0;j<v;j++){var w=A.ofCell(u[j]);var $=q(u[j].$().closest("td"));if(o.isMeasure(w.getLeadingProperty())){$.addClass("sapUiTableMeasureCell");$.toggleClass("sapUiTableCellHidden",C.nodeState.sum&&!w.getSummed());}else{$.removeClass("sapUiTableMeasureCell");}}}};m.prototype.oncontextmenu=function(E){if(q(E.target).closest('tr').hasClass('sapUiTableGroupHeader')||q(E.target).closest('.sapUiTableGroupHeader > .sapUiTableRowSelectionCell').length>0){this._iGroupedLevel=q(E.target).closest('[data-sap-ui-level]').data('sap-ui-level');var o=this._getGroupHeaderMenu();o.openAsContextMenu(E,f.getCell(this,E.target)||E.target);E.preventDefault();E.stopPropagation();}};m.prototype._getGroupHeaderMenu=function(){var t=this;function j(){var i=t._iGroupedLevel-1;if(t._aGroupedColumns[i]){var l=t.getColumns().filter(function(C){return t._aGroupedColumns[i]===C.getId();})[0];return{column:l,index:i};}else{return undefined;}}if(!this._oGroupHeaderMenu){this._oGroupHeaderMenu=new M();this._oGroupHeaderMenuVisibilityItem=new e({text:f.getResourceText("TBL_SHOW_COLUMN"),select:function(){var o=j();if(o){var C=o.column,s=C.getShowIfGrouped();C.setShowIfGrouped(!s);t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:(!s?G.showGroupedColumn:G.hideGroupedColumn)});}}});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMenuVisibilityItem);this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_UNGROUP"),select:function(){var o=j();if(o&&o.column){var u=o.column;u.setGrouped(false);t.fireGroup({column:u,groupedColumns:t._aGroupedColumns,type:G.ungroup});}}}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_UNGROUP_ALL"),select:function(){var l=t.getColumns();t.suspendUpdateAnalyticalInfo();for(var i=0;i<l.length;i++){l[i].setGrouped(false);}t.resumeUpdateAnalyticalInfo();t.fireGroup({column:undefined,groupedColumns:[],type:G.ungroupAll});}}));this._oGroupHeaderMoveUpItem=new e({text:f.getResourceText("TBL_MOVE_UP"),select:function(){var o=j();if(o){var C=o.column;var i=t._aGroupedColumns.indexOf(C.getId());if(i>0){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i-1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveUp});}}},icon:"sap-icon://arrow-top"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveUpItem);this._oGroupHeaderMoveDownItem=new e({text:f.getResourceText("TBL_MOVE_DOWN"),select:function(){var o=j();if(o){var C=o.column;var i=t._aGroupedColumns.indexOf(C.getId());if(i<t._aGroupedColumns.length){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i+1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveDown});}}},icon:"sap-icon://arrow-bottom"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveDownItem);this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_SORT_ASC"),select:function(){var o=j();if(o){var C=o.column;C.sort(false);}},icon:"sap-icon://up"}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_SORT_DESC"),select:function(){var o=j();if(o){var C=o.column;C.sort(true);}},icon:"sap-icon://down"}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_COLLAPSE_LEVEL"),select:function(){t.getBinding("rows").collapseToLevel(t._iGroupedLevel-1);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_COLLAPSE_ALL"),select:function(){t.getBinding("rows").collapseToLevel(0);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_EXPAND_LEVEL"),select:function(){t.getBinding("rows").expandToLevel(t._iGroupedLevel);t.setFirstVisibleRow(0);t._getSelectionPlugin().clearSelection();}}));this._oGroupHeaderMenu.addItem(new e({text:f.getResourceText("TBL_EXPAND_ALL"),select:function(){t.expandAll();}}));}var o=j();if(o){var C=o.column;if(C.getShowIfGrouped()){this._oGroupHeaderMenuVisibilityItem.setText(f.getResourceText("TBL_HIDE_COLUMN"));}else{this._oGroupHeaderMenuVisibilityItem.setText(f.getResourceText("TBL_SHOW_COLUMN"));}this._oGroupHeaderMoveUpItem.setEnabled(o.index>0);this._oGroupHeaderMoveDownItem.setEnabled(o.index<this._aGroupedColumns.length-1);}else{this._oGroupHeaderMoveUpItem.setEnabled(true);this._oGroupHeaderMoveDownItem.setEnabled(true);}return this._oGroupHeaderMenu;};m.prototype._cleanupGroupHeaderMenu=function(){if(this._oGroupHeaderMenu){this._oGroupHeaderMenu.destroy();this._oGroupHeaderMenu=null;this._oGroupHeaderMenuVisibilityItem=null;this._oGroupHeaderMoveUpItem=null;this._oGroupHeaderMoveDownItem=null;}};m.prototype.getContextByIndex=function(i){var o=this.getBinding("rows");return i>=0&&o?o.getContextByIndex(i):null;};m.prototype.getContextInfoByIndex=function(i){var o=this.getBinding("rows");return i>=0&&o?o.getNodeByIndex(i):null;};m.prototype.suspendUpdateAnalyticalInfo=function(){this._bSuspendUpdateAnalyticalInfo=true;};m.prototype.resumeUpdateAnalyticalInfo=function(s,F){this._bSuspendUpdateAnalyticalInfo=false;this._updateColumns(s,F);};m.prototype.addColumn=function(C,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.addColumn.call(this,o,s);this._updateColumns(s);return this;};m.prototype.insertColumn=function(C,i,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.insertColumn.call(this,o,i,s);this._updateColumns(s);return this;};m.prototype.removeColumn=function(C,s){var r=T.prototype.removeColumn.apply(this,arguments);if(!this._bReorderInProcess){this._aGroupedColumns=q.grep(this._aGroupedColumns,function(v){if(C.getId){return v!=C.getId();}else{return v==C;}});}this.updateAnalyticalInfo(s);return r;};m.prototype.removeAllColumns=function(s){this._aGroupedColumns=[];var r=T.prototype.removeAllColumns.apply(this,arguments);this._updateColumns(s);return r;};m.prototype._getColumn=function(C){if(typeof C==="string"){var o=new A({leadingProperty:C,template:C,managed:true});return o;}else if(C instanceof A){return C;}else{throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject");}};m.prototype._updateColumns=function(s,F){if(!this._bSuspendUpdateAnalyticalInfo){this._updateTableColumnDetails();this.updateAnalyticalInfo(s,F);if(this.bOutput){this.invalidate();}}};m.prototype.updateAnalyticalInfo=function(s,F){if(this._bSuspendUpdateAnalyticalInfo){return;}var o=this.getBinding("rows");if(o){var C=this._getColumnInformation();var n=o.getNumberOfExpandedLevels()||0;if(n>this._aGroupedColumns.length){o.setNumberOfExpandedLevels(0);}o.updateAnalyticalInfo(C,F);this._updateTotalRow(s);if(!s){this._getRowContexts();}}};m.prototype.refreshRows=function(){T.prototype.refreshRows.apply(this,arguments);this._updateTotalRow();};m.prototype._updateTotalRow=function(s){var o=this.getBinding("rows");var n=0;var r=this.getRowMode();if(o&&(o.providesGrandTotal()&&o.hasTotaledMeasures())){n=1;}if(r){r.setProperty("fixedBottomRowCount",n,s);}else{this.setProperty("fixedBottomRowCount",n,s);}};m.prototype._updateTableColumnDetails=function(){if(this._bSuspendUpdateAnalyticalInfo){return;}var l=this.getBinding("rows"),r=l&&l.getAnalyticalQueryResult();if(r){var C=this.getColumns(),n=[],u=[],D=[],p={},t,v;for(var i=0;i<C.length;i++){t=C[i];t._isLastGroupableLeft=false;t._bLastGroupAndGrouped=false;t._bDependendGrouped=false;if(!t.getVisible()){continue;}var w=t.getLeadingProperty();v=r.findDimensionByPropertyName(w);if(v){var x=v.getName();if(!p[x]){p[x]={dimension:v,columns:[t]};}else{p[x].columns.push(t);}if(t.getGrouped()&&n.indexOf(x)==-1){n.push(x);}if(D.indexOf(x)==-1){D.push(x);}}}u=q.grep(D,function(s){return n.indexOf(n,s)==-1;});if(n.length>0){q.each(n,function(i,s){q.each(p[s].columns,function(j,o){if(!o.getGrouped()){o._bDependendGrouped=true;}});});if(n.length==D.length){v=r.findDimensionByPropertyName(sap.ui.getCore().byId(this._aGroupedColumns[this._aGroupedColumns.length-1]).getLeadingProperty());var y=p[v.getName()].columns;q.each(y,function(i,o){o._bLastGroupAndGrouped=true;});}}if(u.length==1){q.each(p[u[0]].columns,function(j,o){o._isLastGroupableLeft=true;});}}};m.prototype._getFirstMeasureColumnIndex=function(){var o=this.getBinding("rows"),r=o&&o.getAnalyticalQueryResult(),C=this._getVisibleColumns();if(!r){return-1;}for(var i=0;i<C.length;i++){var j=C[i],l=j.getLeadingProperty();if(r.findMeasureByName(l)||r.findMeasureByPropertyName(l)){return i;}}};m.prototype.getTotalSize=function(){var o=this.getBinding("rows");if(o){return o.getTotalSize();}return 0;};m.prototype._onPersoApplied=function(){T.prototype._onPersoApplied.apply(this,arguments);this._aGroupedColumns=[];var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getGrouped()){this._addGroupedColumn(C[i].getId());}}this._updateColumns();};m.prototype._addGroupedColumn=function(C){if(this._aGroupedColumns.indexOf(C)===-1){this._aGroupedColumns.push(C);}};m.prototype._removeGroupedColumn=function(C){var i=this._aGroupedColumns.indexOf(C);if(i>=0){this._aGroupedColumns.splice(i,1);}};m.prototype.getGroupedColumns=function(){return this._aGroupedColumns;};m.prototype.setCollapseRecursive=function(C){var o=this.getBinding("rows");if(o){g(o.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(o.setCollapseRecursive){o.setCollapseRecursive(C);}}this.setProperty("collapseRecursive",!!C,true);return this;};m.prototype.expand=a.prototype.expand;m.prototype.collapse=a.prototype.collapse;m.prototype.expandAll=function(){var o=this.getBinding("rows");if(o){o.expandToLevel(this._aGroupedColumns.length);this.setFirstVisibleRow(0);this._getSelectionPlugin().clearSelection();}return this;};m.prototype.collapseAll=a.prototype.collapseAll;m.prototype.isExpanded=a.prototype.isExpanded;m.prototype.getAnalyticalInfoOfRow=function(r){if(!f.isA(r,"sap.ui.table.Row")||r.getParent()!==this){return null;}var o=this.getBindingInfo("rows");var j=this.getBinding("rows");if(!o||!j){return null;}var C=r.getBindingContext(o.model);if(!C){return null;}var I=C===j.getGrandTotalContext();var l=null;var n=-1;if(I){l=j.getGrandTotalContextInfo();n=0;}else{l=this.getContextInfoByIndex(r.getIndex());if(l){n=l.level;}}var p=l&&j.nodeHasChildren&&j.nodeHasChildren(l);var s=!p&&!I&&l&&l.nodeState&&l.nodeState.sum;var t=[];if(s||p){var u=this.getGroupedColumns();if(u.length>0&&n>0&&n<=u.length){for(var i=0;i<n;i++){t.push(u[i]);}}}return{grandTotal:I,group:p,groupTotal:s,level:n,context:C,groupedColumns:t};};m.prototype.setRowMode=function(r){T.prototype.setRowMode.apply(this,arguments);this._getRowMode().disableFixedRows();};m.prototype._initLegacyRowMode=function(r){T.prototype._initLegacyRowMode.apply(this,arguments);this._getRowMode().disableFixedRows();};m.prototype._createLegacySelectionPlugin=function(){return new B(this);};return m;});
