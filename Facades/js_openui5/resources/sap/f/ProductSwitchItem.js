/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Icon","sap/m/Text","sap/ui/events/KeyCodes","sap/f/ProductSwitchItemRenderer"],function(C,I,T,K,P){"use strict";var a=C.extend("sap.f.ProductSwitchItem",{metadata:{library:"sap.f",properties:{src:{type:"sap.ui.core.URI",defaultValue:null},title:{type:"string",defaultValue:null},subTitle:{type:"string",defaultValue:null},targetSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},target:{type:"string",group:"Behavior",defaultValue:null}},aggregations:{_icon:{type:"sap.ui.core.Icon",visibility:"hidden",multiple:false},_title:{type:"sap.m.Text",visibility:"hidden",multiple:false}}}});a.prototype.init=function(){this._bSpaceEnterPressed=false;this._bEscapeShiftKeyPress=false;};a.prototype.setTitle=function(t){this.setProperty("title",t);this._getTitle().setText(t);return this;};a.prototype.setSrc=function(s){this.setProperty("src",s);this._getIcon().setSrc(s);return this;};a.prototype.setSubTitle=function(s){this.setProperty("subTitle",s);this._getTitle().setMaxLines(s?1:2);return this;};a.prototype._getIcon=function(){var i=this.getAggregation("_icon");if(!i){i=new I();if(this.getSrc()){i.setSrc(this.getSrc());}this.setAggregation("_icon",i);}return i;};a.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new T({text:this.getTitle(),maxLines:2,textAlign:null}).addStyleClass("sapFPSItemMainTitle").addStyleClass("sapFPSItemTitle");this.setAggregation("_title",t);}return t;};a.prototype._getProductSwitch=function(){return this.getParent().getParent();};a.prototype.onkeyup=function(e){if((e.keyCode===K.SPACE&&!this._bEscapeShiftKeyPress)){this.fireEvent("_itemPress");}if(e.keyCode===K.SPACE||e.keyCode===K.ENTER){this._bSpaceEnterPressed=false;this._bEscapeShiftKeyPress=false;}};a.prototype.ontap=function(){this.fireEvent("_itemPress");};a.prototype.onkeydown=function(e){if((e.keyCode===K.ESCAPE||e.keyCode===K.SHIFT)&&this._bSpaceEnterPressed){this._bEscapeShiftKeyPress=true;}if(e.keyCode===K.SPACE||e.keyCode===K.ENTER){this._bSpaceEnterPressed=true;if(e.keyCode===K.ENTER&&!this._bEscapeShiftKeyPress){this.fireEvent("_itemPress");}e.preventDefault();}};return a;},true);
