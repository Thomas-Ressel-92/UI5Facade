/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/util/deepClone","sap/base/util/ObjectPath","sap/ui/base/BindingParser"],function(M,d,O,B){"use strict";return M.extend("sap.ui.integration.designtime.baseEditor.util.ObjectBinding",{metadata:{properties:{object:{type:"object"},_value:{type:"any",hidden:true}},events:{change:{parameters:{path:{type:"string"},value:{type:"any"}}}}},exit:function(){this._cleanup();},setObject:function(o){var r=this.setProperty("object",o);this._originalObject=d(o);this._init();return r;},setModel:function(){var r=M.prototype.setModel.apply(this,arguments);this._init();return r;},setBindingContext:function(){var r=M.prototype.setBindingContext.apply(this,arguments);this._init();return r;},_init:function(){this._cleanup();var o=this.getObject();if(o){Object.keys(o).forEach(function(k){o[k]=d(this._originalObject[k]);}.bind(this));this._createPropertyBindings(o);}},_cleanup:function(){if(this._mSimpleBindings){Object.keys(this._mSimpleBindings).forEach(function(k){var b=this._mSimpleBindings[k];b.getModel().removeBinding(b);b.destroy();}.bind(this));}this._mSimpleBindings={};},_createPropertyBindings:function(o,p){Object.keys(o).forEach(function(k){var c=p?p+"/"+k:k;if(typeof o[k]==="string"){var b=B.complexParser(o[k]);if(b){if(b.parts){if(!b.parts.find(function(P){return!this.getModel(P.model);}.bind(this))){b.parts.forEach(function(P){this._createSimpleBinding(P,c,b);}.bind(this));}else{return;}}else if(this.getModel(b.model)){this._createSimpleBinding(b,c,b);}else{return;}this._updateValue(c,b);}}else if(o[k]&&typeof o[k]==="object"){this._createPropertyBindings(o[k],c);}}.bind(this));},_updateValue:function(p,b){var o=this.getObject();var P=p.split("/");var k=P.pop();if(P.length){o=O.get(P,o);}this.bindProperty("_value",b);var v=d(this.getProperty("_value"));this.unbindProperty("_value");if(v!==o[k]){o[k]=v;this.fireChange({path:p,value:v});}},_createSimpleBinding:function(s,c,b){var C=this.getBindingContext(s.model);var h=s.model+">"+s.path;var o=this._mSimpleBindings[h];if(!o){o=this.getModel(s.model).bindProperty(s.path,C);this._mSimpleBindings[h]=o;}o.attachChange(function(e){this._updateValue(c,b);}.bind(this));return o;}});});
