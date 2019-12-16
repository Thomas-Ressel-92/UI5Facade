/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Element","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/Utils"],function(L,E,J,F,U,a){"use strict";function _(C,p){var s=C.getSelector&&C.getSelector();if(!s||!s.id){throw new Error("No selector in change found or no selector ID.");}var o=p.modifier.bySelector(s,p.appComponent,p.view);if(!o){throw new Error("A flexibility change tries to change a nonexistent control.");}var D=C.getDependentControlSelectorList();D.forEach(function(h){var i=p.modifier.bySelector(h,p.appComponent,p.view);if(!i){throw new Error("A dependent selector control of the flexibility change is not available.");}});return o;}function b(C,o,m,h,p){var x=f(p);var i=U.getControlIfTemplateAffected(o,C,p);var I=F.hasChangeApplyFinishedCustomData(i.control,o,p.modifier);var j=o.isApplyProcessFinished();if(j&&!I){if(!x){var k=U.checkIfDependencyIsStillValid.bind(null,p.appComponent,p.modifier,m);m=h._oChangePersistence.copyDependenciesFromInitialChangesMap(o,k,p.appComponent);}o.setInitialApplyState();}else if(!j&&I){o.markFinished();}return m;}function c(C,p){var s;if(f(p)&&C.getDefinition().jsOnly){s="Change cannot be applied in XML. Retrying in JS.";}if(s){C.setInitialApplyState();throw Error(s);}}function d(C,m,i,p){if(i instanceof E){m.control=i;}if(m.control){p.modifier.updateAggregation(m.originalControl,C.getContent().boundAggregation);}F.addAppliedCustomData(m.control,C,p,f(p));var r={success:true};C.markFinished(r);return r;}function e(o,C,m,p){var x=f(p);var r={success:false,error:o};var s=C.getId();var l="Change ''{0}'' could not be applied.";var h=o instanceof Error;var i=F.getCustomDataIdentifier(false,h,x);switch(i){case F.notApplicableChangesCustomDataKey:a.formatAndLogMessage("info",[l,o.message],[s]);break;case F.failedChangesCustomDataKeyXml:a.formatAndLogMessage("warning",[l,"Merge error detected while processing the XML tree."],[s],o.stack);break;case F.failedChangesCustomDataKeyJs:a.formatAndLogMessage("error",[l,"Merge error detected while processing the JS control tree."],[s],o.stack);break;}F.addFailedCustomData(m.control,C,p,i);if(x){C.setInitialApplyState();}else{C.markFinished(r);}return r;}function f(p){return p.modifier.targets==="xmlTree";}function g(o,C){var D=C.getDefinition();var s=D.changeType;var t=D.selector.id;var h=D.namespace+D.fileName+"."+D.fileType;var w="A flexibility change could not be applied.";w+="\nThe displayed UI might not be displayed as intedend.";if(o.message){w+="\n   occurred error message: '"+o.message+"'";}w+="\n   type of change: '"+s+"'";w+="\n   LRep location of the change: "+h;w+="\n   id of targeted control: '"+t+"'.";L.warning(w,undefined,"sap.ui.fl.apply._internal.changes.Applier");}var A={PENDING:"sap.ui.fl:PendingChange",applyChangeOnControl:function(C,o,p){var m=U.getControlIfTemplateAffected(C,o,p);return U.getChangeHandler(C,m,p).then(function(h){c(C,p);return h;}).then(function(h){if(C.hasApplyProcessStarted()){return C.addPromiseForApplyProcessing().then(function(r){C.markFinished();return r;});}else if(!C.isApplyProcessFinished()){return new a.FakePromise().then(function(){C.startApplying();return h.applyChange(C,m.control,p);}).then(function(i){return d(C,m,i,p);}).catch(function(i){return e(i,C,m,p);});}var r={success:true};C.markFinished(r);return r;}).catch(function(h){return{success:false,error:h};});},applyAllChangesForControl:function(G,o,h,C){var p=[];var s=C.getId();var m=G();var i=m.mChanges;var j=i[s]||[];var P={modifier:J,appComponent:o,view:a.getViewForControl(C)};j.forEach(function(k){m=b(C,k,m,h,P);k.setQueuedForApply();if(!m.mDependencies[k.getId()]){p.push(function(){return A.applyChangeOnControl(k,C,P).then(function(){h._updateDependencies(m,k.getId());});});}else{m.mDependencies[k.getId()][A.PENDING]=A.applyChangeOnControl.bind(A,k,C,P);}});if(j.length||m.mControlsWithDependencies[s]){delete m.mControlsWithDependencies[s];return a.execPromiseQueueSequentially(p).then(function(){return h._processDependentQueue(m,o);});}return new a.FakePromise();},applyAllChangesForXMLView:function(p,C){var P=[];if(!Array.isArray(C)){var s="No list of changes was passed for processing the flexibility on view: "+p.view+".";L.error(s,undefined,"sap.ui.fl.apply._internal.changes.Applier");C=[];}C.forEach(function(o){try{var h=_(o,p);o.setQueuedForApply();P.push(function(){b(h,o,undefined,undefined,p);if(o.isApplyProcessFinished()){return new a.FakePromise();}return A.applyChangeOnControl(o,h,p).then(function(r){if(!r.success){g(r.error||{},o);}});});}catch(i){g(i,o);}});return a.execPromiseQueueSequentially(P).then(function(){return p.view;});}};return A;},true);
