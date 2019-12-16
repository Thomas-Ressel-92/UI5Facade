/*
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","../utils/TableUtils","sap/ui/core/Element","sap/base/Log","sap/ui/thirdparty/jquery"],function(l,T,E,L,q){"use strict";var R=E.extend("sap.ui.table.rowmodes.RowMode",{metadata:{library:"sap.ui.table","abstract":true,properties:{rowCount:{type:"int",defaultValue:10,group:"Appearance"},fixedTopRowCount:{type:"int",defaultValue:0,group:"Appearance"},fixedBottomRowCount:{type:"int",defaultValue:0,group:"Appearance"}}}});var a={};R.prototype.init=function(t){this._bFiredRowsUpdatedAfterRendering=false;this._bListeningForFirstRowsUpdatedAfterRendering=false;this.updateTableAsync=T.throttle(this.updateTable,{wait:50,asyncLeading:true});};R.prototype.exit=function(){this.detachEvents();this.cancelAsyncOperations();};R.prototype.setParent=function(){this.detachEvents();this.cancelAsyncOperations();E.prototype.setParent.apply(this,arguments);this.attachEvents();};R.prototype.attachEvents=function(){T.addDelegate(this.getTable(),a,this);};R.prototype.detachEvents=function(){T.removeDelegate(this.getTable(),a);};R.prototype.cancelAsyncOperations=function(){var t=this.getTable();if(t){clearTimeout(t._mTimeouts.refreshRowsCreateRows);}this.updateTableAsync.cancel();};R.prototype.getMinRequestLength=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getMinRequestLength");};R.prototype.getComputedRowCounts=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getComputedRowCounts");};R.prototype.getTableStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getTableStyles");};R.prototype.getTableBottomPlaceholderStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getTableBottomPlaceholderStyles");};R.prototype.getRowContainerStyles=function(){throw new Error(this.getMetadata().getName()+": sap.ui.table.rowmodes.RowMode subclass did not implement #getRowContainerStyles");};R.prototype.getTable=function(){var p=this.getParent();return T.isA(p,"sap.ui.table.Table")?p:null;};R.prototype.updateTable=function(r){var t=this.getTable();if(!t){return;}this.updateTableAsync.cancel();var b=this.updateTableRows();if(t._bInvalid){return;}this.applyTableStyles();this.applyRowContainerStyles();this.applyTableBottomPlaceholderStyles();if(b||t.getRows().some(function(o){return o.getDomRef()==null;})){this.renderTableRows();}if(b||t.getRows().length>0){this.fireRowsUpdated(r);}};R.prototype.getBaseRowContentHeight=function(){return 0;};R.prototype.getBaseRowHeightOfTable=function(){var t=this.getTable();return t?t._getBaseRowHeight():0;};R.prototype.getDefaultRowContentHeightOfTable=function(){var t=this.getTable();return t?t._getDefaultRowContentHeight():0;};R.prototype.getTotalRowCountOfTable=function(){var t=this.getTable();return t?t._getTotalRowCount():0;};R.prototype.updateTableSizes=function(r){};R.prototype.unbindRows=function(){clearTimeout(this.getTable()._mTimeouts.refreshRowsCreateRows);this.updateTable(T.RowsUpdateReason.Unbind);};R.prototype.refreshRows=function(r){};R.prototype.updateRows=function(r){var t=this.getTable();clearTimeout(t._mTimeouts.refreshRowsCreateRows);if(!t._bBindingReady){var C=this.getRowContexts(null,true);if(this.getTotalRowCountOfTable()===0&&C.length===1){var v=C[0];var V=t._getRowClone("Virtual");V.setBindingContext(v);t.addAggregation("rows",V,true);t.removeAggregation("rows",V,true);V.setBindingContext(null);V.destroy();}return;}this.updateTableAsync(r);};R.prototype.applyTableStyles=function(r){var t=this.getTableStyles();if(r){r.style("height",t.height);r.style("min-height",t.minHeight);r.style("max-height",t.maxHeight);return;}var o=this.getTable();var b=o?o.getDomRef():null;if(b){b.style.height=t.height;b.style.minHeight=t.minHeight;b.style.maxHeight=t.maxHeight;}};R.prototype.applyTableBottomPlaceholderStyles=function(r){var p=this.getTableBottomPlaceholderStyles();if(r){r.style("height",p.height);return;}var t=this.getTable();var P=t?t.getDomRef("placeholder-bottom"):null;if(P){P.style.height=p.height;}};R.prototype.applyRowContainerStyles=function(r){var m=this.getRowContainerStyles();if(r){r.style("height",m.height);r.style("min-height",m.minHeight);r.style("max-height",m.maxHeight);return;}var t=this.getTable();var o=t?t.getDomRef("tableCCnt"):null;if(o){o.style.height=m.height;o.style.minHeight=m.minHeight;o.style.maxHeight=m.maxHeight;}};R.prototype.sanitizeRowCounts=function(C,f,F){C=Math.max(0,C);f=Math.max(0,f);F=Math.max(0,F);if(f+F>=C){F=Math.max(0,F-Math.max(0,(f+F-(C-1))));f=Math.max(0,f-Math.max(0,(f+F-(C-1))));}return{count:C,scrollable:C-f-F,fixedTop:f,fixedBottom:F};};R.prototype.renderRowStyles=function(r){};R.prototype.renderCellContentStyles=function(r){};R.prototype.initTableRowsAfterDataRequested=function(r){var t=this.getTable();var b=t.getBinding("rows");clearTimeout(t._mTimeouts.refreshRowsCreateRows);if(!b||r<=0||t.getRows().length>0){return;}b.attachEventOnce("dataRequested",function(){clearTimeout(t._mTimeouts.refreshRowsCreateRows);t._mTimeouts.refreshRowsCreateRows=setTimeout(function(){if(t.getRows().length>0){return;}var d=c(t,r),o;var B=t.getBindingInfo("rows");var m=B?B.model:undefined;for(var i=0;i<d.length;i++){o=d[i];o.setBindingContext(null,m);t.addAggregation("rows",o,true);}t._bRowAggregationInvalid=false;},0);});};R.prototype.updateTableRows=function(){var t=this.getTable();var r=t.getRows();var n=this.getComputedRowCounts().count;var i;var b=false;if(T.isNoDataVisible(t)&&!t.getBinding("rows")){n=0;}else if(T.isVariableRowHeightEnabled(t)){n=n+1;}if(t._bRowAggregationInvalid){b=r.length>0;t.destroyAggregation("rows",t._bInvalid?"KeepDom":true);r=[];}if(n===r.length){u(this,r);return b;}T.dynamicCall(t._getSyncExtension,function(s){s.syncRowCount(n);});if(r.length<n){var N=c(t,n-r.length);r=r.concat(N);u(this,r);for(i=0;i<N.length;i++){t.addAggregation("rows",N[i],true);N[i]._updateTableCells(N[i].getBindingContext());}}else{for(i=r.length-1;i>=n;i--){t.removeAggregation("rows",i,true);}r.splice(n);u(this,r);}b=true;t._bRowAggregationInvalid=false;return b;};R.prototype.renderTableRows=function(){var t=this.getTable();var o=t?t.getDomRef("tableCCnt"):null;if(!o){return;}var b=q.Event("BeforeRendering");b.setMarked("renderRows");b.srcControl=this;t._handleEvent(b);var r=sap.ui.getCore().createRenderManager();var d=t.getRenderer();d.renderTableCCnt(r,t);r.flush(o,false,false);r.destroy();var A=q.Event("AfterRendering");A.setMarked("renderRows");A.srcControl=this;t._handleEvent(A);};R.prototype.getRowContexts=function(r,s){var t=this.getTable();if(!t){return[];}return t._getRowContexts(r,s===true);};R.prototype.fireRowsUpdated=function(r){var t=this.getTable();if(!t||!t._bContextsAvailable){return;}if(!this._bFiredRowsUpdatedAfterRendering){r=T.RowsUpdateReason.Render;if(!this._bListeningForFirstRowsUpdatedAfterRendering){this._bListeningForFirstRowsUpdatedAfterRendering=true;t.attachEvent("_rowsUpdated",function(){this._bFiredRowsUpdatedAfterRendering=true;this._bListeningForFirstRowsUpdatedAfterRendering=false;}.bind(this));}}t._fireRowsUpdated(r);};R.prototype.disableFixedRows=function(){if(this.bFixedRowsDisabled===true){return;}Object.defineProperty(this,"bFixedRowsDisabled",{value:true});function b(){L.error("This mode does not support fixed rows",this);}this.setProperty("fixedTopRowCount",0,true);this.setFixedTopRowCount=b;this.setProperty("fixedBottomRowCount",0,true);this.setFixedBottomRowCount=b;};function c(t,r){var b=[];var s=t.getRows().length;for(var i=0;i<r;i++){b.push(t._getRowClone(s+i));}return b;}function u(m,r){var t=m.getParent();var C=m.getRowContexts(r.length);if(!t||r.length===0){return;}var b=t.getBinding("rows");var B=t.getBindingInfo("rows");var M=B?B.model:undefined;for(var i=0;i<r.length;i++){r[i].setRowBindingContext(C[i],M,b);}}a.onBeforeRendering=function(e){var r=e&&e.isMarked("renderRows");if(!r){this._bFiredRowsUpdatedAfterRendering=false;}};return R;});
