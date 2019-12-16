/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dt/ElementOverlay","sap/ui/dt/AggregationOverlay","sap/ui/dt/OverlayRegistry","sap/ui/dt/SelectionManager","sap/ui/dt/ElementDesignTimeMetadata","sap/ui/dt/AggregationDesignTimeMetadata","sap/ui/dt/ElementUtil","sap/ui/dt/Overlay","sap/ui/dt/OverlayUtil","sap/ui/dt/MetadataPropagationUtil","sap/ui/dt/Util","sap/ui/dt/TaskManager","sap/base/Log","sap/base/util/isPlainObject","sap/base/util/merge","sap/ui/dt/SelectionMode","sap/base/util/includes","sap/ui/dt/DesignTimeStatus","sap/base/util/restricted/_curry"],function(M,E,A,O,S,a,b,c,d,e,f,U,T,L,i,m,g,h,D,_){"use strict";var j=M.extend("sap.ui.dt.DesignTime",{metadata:{library:"sap.ui.dt",properties:{designTimeMetadata:{type:"object"},enabled:{type:"boolean",defaultValue:true},scope:{type:"string",defaultValue:"default"}},associations:{rootElements:{type:"sap.ui.core.Element",multiple:true}},aggregations:{plugins:{type:"sap.ui.dt.Plugin",multiple:true}},events:{addRootElement:{parameters:{element:{type:"sap.ui.core.Element"}}},addPlugin:{parameters:{plugin:{type:"sap.ui.dt.Plugin"}}},enabledChanged:{parameters:{value:{type:"boolean"}}},elementOverlayCreated:{parameters:{elementOverlay:{type:"sap.ui.dt.ElementOverlay"}}},elementOverlayDestroyed:{parameters:{elementOverlay:{type:"sap.ui.dt.ElementOverlay"}}},elementOverlayAdded:{parameters:{id:{type:"string"},targetIndex:{type:"integer"},targetId:{type:"string"},targetAggregation:{type:"string"}}},elementOverlayMoved:{parameters:{id:{type:"string"},targetIndex:{type:"integer"},targetId:{type:"string"},targetAggregation:{type:"string"}}},elementOverlayEditableChanged:{parameters:{id:{type:"string"},elementId:{type:"string"},editable:{type:"boolean"}}},elementPropertyChanged:{parameters:{id:{type:"string"},name:{type:"string"},oldValue:{type:"any"},value:{type:"any"}}},syncing:{},synced:{},syncFailed:{}}},constructor:function(){this._sStatus=D.SYNCED;this._mPendingOverlays={};this._oTaskManager=new T({complete:function(o){if(o.getSource().isEmpty()){this._registerElementOverlays();if(this._oTaskManager.isEmpty()&&this._sStatus!==D.SYNCED){this._sStatus=D.SYNCED;setTimeout(function(){if(this._sStatus===D.SYNCED){this.fireSynced();}}.bind(this),0);}}}.bind(this),add:function(o){if(o.getSource().count()===1){this._sStatus=D.SYNCING;this.fireSyncing();}}.bind(this)});this._oSelectionManager=new S();this._onElementOverlayDestroyed=this._onElementOverlayDestroyed.bind(this);this._aOverlaysCreatedInLastBatch=[];M.apply(this,arguments);this.getRootElements().forEach(this._createOverlaysForRootElement,this);this.attachEvent("addRootElement",function(o){this._createOverlaysForRootElement(o.getParameter('element'));},this);this.getPlugins().forEach(function(p){p.attachEvent("processingStatusChange",this._onProcessingStatusChange,this);},this);this.attachEvent("addPlugin",function(o){var p=o.getParameter('plugin');p.attachEvent("processingStatusChange",this._onProcessingStatusChange,this);},this);this.attachEvent("enabledChanged",function(o){var v=o.getParameter('value');var $=d.getOverlayContainer();$[v?'show':'hide']();this.getRootElements().forEach(function(r){var R=O.getOverlay(r);R.setVisible(v);if(v){R.applyStyles(true);}});},this);}});j.prototype._onProcessingStatusChange=function(o){if(o.getParameter("processing")){this._oTaskManager.add({type:"pluginInProcess",plugin:o.getSource().getMetadata().getName()});}else{this._oTaskManager.completeBy({type:"pluginInProcess",plugin:o.getSource().getMetadata().getName()});}};j.prototype._removeOverlayFromSyncingBatch=function(o){var I=this._aOverlaysCreatedInLastBatch.indexOf(o);if(I!==-1){this._aOverlaysCreatedInLastBatch.splice(I,1);}};j.prototype._registerElementOverlays=function(){var k=this._aOverlaysCreatedInLastBatch.slice();if(!k.length){return;}var t=this._oTaskManager.add({type:"registerElementOverlays"});var p=this.getPlugins();k.forEach(function(o){O.register(o);o.attachBeforeDestroy(function(l){O.deregister(l.getSource());});});k.forEach(function(o){p.forEach(function(P){try{P.callElementOverlayRegistrationMethods(o);}catch(v){var l=U.propagateError(v,"DesignTime#_registerElementOverlays",U.printf('registerElementOverlay() method of the plugin {0} has failed for overlay with id="{1}" (element id="{2}")',P.getMetadata().getName(),o.getId(),o.getElement().getId()));L.error(U.errorToString(l));}});},this);k.forEach(function(o){try{this.fireElementOverlayCreated({elementOverlay:o});}catch(v){var l=U.propagateError(v,"DesignTime#_registerElementOverlays",U.printf('One of the listeners of elementOverlayCreated event failed while precessing the overlay with id="{0}" for element with id="{1}"',o.getId(),o.getElement().getId()));L.error(U.errorToString(l));}},this);this._aOverlaysCreatedInLastBatch=[];this._oTaskManager.complete(t);};j.prototype.exit=function(){this._bDestroyPending=true;this.getPlugins().forEach(function(p){p.destroy();});this._oSelectionManager.destroy();this._oTaskManager.destroy();this._destroyAllOverlays();this._aOverlaysCreatedInLastBatch=[];delete this._bDestroyPending;};j.prototype.getSelection=function(){return this.getSelectionManager().get();};j.prototype.getSelectionManager=function(){return this._oSelectionManager;};j.prototype.getPlugins=function(){return this.getAggregation("plugins")||[];};j.prototype.getBusyPlugins=function(){return this.getPlugins().filter(function(p){return p.isBusy();});};j.prototype.addPlugin=function(p){this.addAggregation("plugins",p);this.fireAddPlugin({plugin:p});p.setDesignTime(this);return this;};j.prototype.insertPlugin=function(p,I){this.insertAggregation("plugins",p,I);this.fireAddPlugin({plugin:p});p.setDesignTime(this);return this;};j.prototype.removePlugin=function(p){this.getPlugins().forEach(function(C){if(C===p){p.setDesignTime(null);p.detachEvent("processingStatusChange",this._onProcessingStatusChange,this);}}.bind(this));this.removeAggregation("plugins",p);return this;};j.prototype.removeAllPlugins=function(){this.getPlugins().forEach(function(p){p.setDesignTime(null);p.detachEvent("processingStatusChange",this._onProcessingStatusChange,this);}.bind(this));this.removeAllAggregation("plugins");return this;};j.prototype.getRootElements=function(){return(this.getAssociation("rootElements")||[]).map(function(s){return c.getElementInstance(s);});};j.prototype.getDesignTimeMetadataFor=function(o){var C;if(typeof o==='string'){C=o;L.error('sap.ui.dt.DesignTime#getDesignTimeMetadataFor / Function getDesignTimeMetadataFor() should be called with element instance');}else{C=o.getMetadata().getName();}return(this.getDesignTimeMetadata()||{})[C];};j.prototype.addRootElement=function(r){this.addAssociation("rootElements",r);this.fireAddRootElement({element:r});};j.prototype._createOverlaysForRootElement=function(r){var t=this._oTaskManager.add({type:"createOverlay",element:r,root:true});this.createOverlay({element:c.getElementInstance(r),root:true,visible:this.getEnabled()}).then(function(o){d.getOverlayContainer().append(o.render());o.applyStyles();this._oTaskManager.complete(t);return o;}.bind(this),function(v){var o=U.propagateError(v,"DesignTime#_createOverlaysForRootElement",U.printf('Root element with id = "{0}" initialization is failed',r.getId()));L.error(U.errorToString(o));this._oTaskManager.cancel(t);}.bind(this));};j.prototype.removeRootElement=function(r){this.removeAssociation("rootElements",r);this._destroyOverlaysForElement(c.getElementInstance(r));return this;};j.prototype.removeAllRootElement=function(){this.removeAssociation("rootElements");this._destroyAllOverlays();return this;};j.prototype.getElementOverlays=function(){var k=[];this._iterateRootElements(function(r){k=k.concat(this._getAllElementOverlaysIn(r));},this);return k;};j.prototype.createOverlay=function(v){var p=Object.assign({},i(v)?v:{element:v});var t=this._oTaskManager.add({type:'createOverlay'});if(!p.element||!c.isElementValid(p.element)){this._oTaskManager.cancel(t);return this._rejectCreateOverlay(p.element);}var s=p.element.getId();var o=O.getOverlay(s);if(o){this._oTaskManager.complete(t);return Promise.resolve(o);}else if(s in this._mPendingOverlays){this._oTaskManager.complete(t);return this._mPendingOverlays[s];}if(typeof p.root==="undefined"){p.root=true;}this._mPendingOverlays[s]=this._createElementOverlay(p).then(function(o){return this._createChildren(o,p.parentMetadata).then(function(){this.attachEventOnce("synced",function(){delete this._mPendingOverlays[s];},this);if(this.bIsDestroyed){o.detachEvent('destroyed',this._onElementOverlayDestroyed);o.destroy();this._oTaskManager.cancel(t);return Promise.reject(U.createError("DesignTime#createOverlay","while creating overlay, DesignTime instance has been destroyed"));}else if(o.bIsDestroyed){this._oTaskManager.cancel(t);return Promise.reject(U.createError("DesignTime#createOverlay","while creating children overlays, its parent overlay has been destroyed"));}this._aOverlaysCreatedInLastBatch.push(o);this._oTaskManager.complete(t);return o;}.bind(this));}.bind(this)).catch(function(k){var l=U.propagateError(k,'DesignTime#createOverlay',U.printf("Failed attempt to create overlay for '{0}'",s));delete this._mPendingOverlays[s];this.fireSyncFailed({error:l});this._oTaskManager.cancel(t);return Promise.reject(l);}.bind(this));return this._mPendingOverlays[s];};j.prototype._rejectCreateOverlay=function(o){var r;if(!o){r="Cannot create overlay — no element is specified.";}else if(o.bIsDestroyed){r="Cannot create overlay — the element is already destroyed.";}else if(o instanceof M&&!c.isElementInTemplate(o)){r="Element is in a bound aggregation, but not found in the binding template. Skipping overlay creation for element with id='"+o.getId()+"'. Please report to CA-UI5-FL-RTA component.";}else{r=U.printf("Cannot create overlay without a valid element. Expected a descendant of sap.ui.core.Element or sap.ui.core.Component, but {0} was given",U.getObjectType(o));}return Promise.reject(U.createError("DesignTime#createOverlay",r));};j.prototype._createElementOverlay=function(p){var o=p.element;function k(P){return new E(P);}return new Promise(function(r,R){k({element:o,isRoot:p.root,visible:typeof p.visible!=="boolean"||p.visible,metadataScope:this.getScope(),designTimeMetadata:(this.getDesignTimeMetadataFor(o)instanceof a?this.getDesignTimeMetadataFor(o):_(function(l,P,o,n){n=m({},n,l);this._mMetadataOriginal=n;if(P){n=f.propagateMetadataToElementOverlay(n,P,o);}return n;})(this.getDesignTimeMetadataFor(o),p.parentMetadata,o)),init:function(l){r(l.getSource());},initFailed:function(s,l){var n=l.getSource();var q=U.propagateError(l.getParameter('error'),'DesignTime#_createElementOverlay',U.printf("Can't create overlay properly (id='{0}') for '{1}'",n.getId(),s));n.detachEvent('destroyed',this._onElementOverlayDestroyed);n.detachEvent('elementDestroyed',this._onElementDestroyed);n.destroy();R(q);}.bind(this,o.getId()),destroyed:this._onElementOverlayDestroyed,elementDestroyed:this._onElementDestroyed.bind(this),selectionChange:this._onElementOverlaySelectionChange.bind(this),elementModified:this._onElementModified.bind(this),editableChange:this._onEditableChanged.bind(this)});}.bind(this));};j.prototype._createChildren=function(o,p){return Promise.all(o.getAggregationNames().map(function(s){var k=o.getElement();var l=k.getMetadata().getName();var n=f.propagateMetadataToAggregationOverlay(o.getDesignTimeMetadata().getAggregation(s),k,p);var q=new A({aggregationName:s,element:k,designTimeMetadata:new b({data:n}),beforeDestroy:function(r){O.deregister(r.getSource());},destroyed:this._onAggregationOverlayDestroyed});O.register(q);return Promise.all(c[q.isAssociation()?'getAssociationInstances':'getAggregation'](k,s).map(function(P,k){return this.createOverlay({element:k,root:false,parentMetadata:n}).catch(function(r){var t=this._enrichChildCreationError(r,k,P,s);L[t.severity](t.message);return t.errorObject;}.bind(this));}.bind(this,l))).then(function(C){C.map(function(r){if(r instanceof E&&!r.bIsDestroyed){q.addChild(r,true);}},this);return q;}.bind(this));},this)).then(function(k){k.forEach(function(l){if(o.bIsDestroyed){l.destroy();}else{o.addChild(l,true);}});});};j.prototype._enrichChildCreationError=function(o,k,p,s){var l="error";var n=U.errorToString(o);if(o.message.includes("Cannot create overlay without a valid element")){l="warning";o=U.createError("DesignTime#_createChildren",U.printf(["Child element in aggregation '{0}' of {1} must be a descendant of sap.ui.core.Element or ","sap.ui.core.Component, but {2} was give. Consider ignoring the aggregation '{0}' ","in the .designtime configuration of the control."].join(''),s,p,U.getObjectType(k)));n=o.toString();}else if(o.message.startsWith("Element is in a bound aggregation")){l="error";n=o.toString();}return{errorObject:o,severity:l,message:n};};j.prototype._destroyOverlaysForElement=function(o){var k=O.getOverlay(o);if(k){k.destroy();}};j.prototype._destroyAllOverlays=function(){this._iterateRootElements(function(r){this._destroyOverlaysForElement(r);},this);};j.prototype._onElementOverlayDestroyed=function(o){if(this._bDestroyPending){return;}var k=o.getSource();var s=k.getAssociation('element');if(s in this._mPendingOverlays){this._removeOverlayFromSyncingBatch(k);return;}if(!O.hasOverlays()){d.destroyMutationObserver();d.removeOverlayContainer();}if(k.isSelected()){this.getSelectionManager().remove(k);}this.fireElementOverlayDestroyed({elementOverlay:k});};j.prototype._onElementDestroyed=function(o){var s=o.getParameter("targetId");this.removeRootElement(s);};j.prototype._onAggregationOverlayDestroyed=function(){if(!O.hasOverlays()){d.removeOverlayContainer();}};j.prototype._onElementOverlaySelectionChange=function(o){var k=o.getSource();var s=o.getParameter("selected");if(s){if(this.getSelectionManager().getSelectionMode()===g.Multi){this.getSelectionManager().add(k);}else{this.getSelectionManager().set(k);}if(!h(this.getSelectionManager().get(),k)){k.setSelected(false);}}else{this.getSelectionManager().remove(k);}};j.prototype._onElementModified=function(o){var p=m({},o.getParameters());var k=o.getSource();p.type=!p.type?o.getId():p.type;switch(p.type){case"addOrSetAggregation":case"insertAggregation":if(this.getStatus()===D.SYNCING){this.attachEventOnce("synced",p,function(){if(!this.bIsDestroyed){this._onAddAggregation(arguments[1].value,arguments[1].target,arguments[1].name);}},this);}else{this._onAddAggregation(p.value,p.target,p.name);}break;case"setParent":setTimeout(function(){if(!this.bIsDestroyed){this._checkIfOverlayShouldBeDestroyed(p.target);}}.bind(this),0);break;case"propertyChanged":p.id=o.getSource().getId();delete p.type;delete p.target;if(this.getStatus()===D.SYNCING){this.attachEventOnce("synced",p,function(){if(!k.bIsDestroyed){this.fireElementPropertyChanged(arguments[1]);}},this);}else{this.fireElementPropertyChanged(p);}break;}};j.prototype._onEditableChanged=function(o){var p=m({},o.getParameters());var k=o.getSource();p.id=k.getId();if(this.getStatus()===D.SYNCING){this.attachEventOnce("synced",p,function(){if(!k.bIsDestroyed){this.fireElementOverlayEditableChanged(arguments[1]);}},this);}else{this.fireElementOverlayEditableChanged(p);}};j.prototype._onAddAggregation=function(o,p,s){if(c.isElementValid(o)){var P=O.getOverlay(p);var k=P.getAggregationOverlay(s);var l=O.getOverlay(o);if(!l&&k&&k.getElement()){var t=this._oTaskManager.add({type:'createChildOverlay',element:o});this.createOverlay({element:o,root:false,parentMetadata:k.getDesignTimeMetadata().getData()}).then(function(l){var I=k.insertChild(null,l);if(I===true){l.applyStyles();var n=k.indexOfAggregation('children',l);this.attachEventOnce("synced",l,function(){if(!l.bIsDestroyed){this.fireElementOverlayAdded({id:l.getId(),targetIndex:n,targetId:k.getId(),targetAggregation:k.getAggregationName()});}},this);}this._oTaskManager.complete(t);}.bind(this)).catch(function(n,q,v){this._oTaskManager.cancel(t);var r=U.propagateError(v,"DesignTime#_onAddAggregation",U.printf("Failed to add new element overlay (elementId='{0}') into aggregation overlay (id='{1}')",n,q));if(!o.bIsDestroyed&&!k.bIsDestroyed){L.error(U.errorToString(r));}}.bind(this,o.getId(),k.getId()));}else{if(l&&!this._isElementInRootElements(l)&&l.isRoot()){l.setIsRoot(false);}k.insertChild(null,l);l.setDesignTimeMetadata(f.propagateMetadataToElementOverlay(l._mMetadataOriginal,k.getDesignTimeMetadata().getData(),o));this.fireElementOverlayMoved({id:l.getId(),targetIndex:k.indexOfAggregation('children',l),targetId:k.getId(),targetAggregation:k.getAggregationName()});}}};j.prototype._checkIfOverlayShouldBeDestroyed=function(o){var k=O.getOverlay(o);if(!o.bIsDestroyed&&k&&(!this._isElementInRootElements(o)||o.sParentAggregationName==="dependents")){k.destroy();}};j.prototype._isElementInRootElements=function(o){var F=false;this._iterateRootElements(function(r){if(c.hasAncestor(o,r)){F=true;return false;}});return F;};j.prototype._iterateRootElements=function(s,o){var r=this.getRootElements();r.forEach(function(R){var k=c.getElementInstance(R);s.call(o||this,k);},this);};j.prototype._getAllElementOverlaysIn=function(o){var k=[];var l=O.getOverlay(o);if(l){e.iterateOverlayElementTree(l,function(C){if(C.getDesignTimeMetadata()){k.push(C);}});}return k;};j.prototype.setEnabled=function(v){v=!!v;if(this.getEnabled()!==v){this.setProperty('enabled',v);this.fireEnabledChanged({value:v});}};j.prototype.getStatus=function(){return this._sStatus;};return j;},true);
