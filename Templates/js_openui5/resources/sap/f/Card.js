/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ComponentContainer","sap/f/cards/CardComponent","sap/base/Log","./CardRenderer"],function(l,C,a,b,L,c){"use strict";var d=C.extend("sap.f.Card",{metadata:{library:"sap.f",properties:{title:{type:"string",defaultValue:""},subtitle:{type:"string",defaultValue:""},status:{type:"string",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},component:{type:"string",defaultValue:""},verticalSize:{type:"int",value:2},horizontalSize:{type:"int",value:2},iconColor:{type:"string"},iconBackgroundColor:{type:"string"},color:{type:"string"},backgroundColor:{type:"string"},backgroundImage:{type:"string"},backgroundImageSize:{type:"string"}},aggregations:{_content:{multiple:false,visibility:"hidden"}},events:{}}});d.prototype.getRaster=function(){if(this.getParent().isA("sap.ui.layout.CSSGrid")){return"CSSGrid";}else{if(!d.defaultRaster){var s=document.createElement("span");s.className="sapFCardDefaultRaster";document.body.appendChild(s);var S=window.getComputedStyle(s);d.defaultRaster={maxWidth:S.maxWidth,maxHeight:S.maxHeight,minWidth:S.minWidth,minHeight:S.minHeight};s.parentNode.removeChild(s);}return d.defaultRaster;}};d.prototype.setBusy=function(v){this.setProperty("busy",v,true);var D=this.getDomRef();if(D){if(v===true){D.classList.add("sapFCardLoading");}else{D.classList.remove("sapFCardLoading");}}return this;};d.prototype.onAfterRendering=function(){var D=this.getDomRef();if(D){var t=D.querySelector("h1");if(t){if(t.scrollWidth>t.offsetWidth){t.classList.add("sapFCardTextScroll");}else{t.classList.remove("sapFCardTextScroll");}}var s=D.querySelector("h2");if(s){if(s.scrollWidth>s.offsetWidth){s.classList.add("sapFCardTextScroll");}else{s.classList.remove("sapFCardTextScroll");}}}};d.prototype.setTitle=function(v){this.setProperty("title",v,true);var D=this.getDomRef();if(D){var t=D.querySelector("h1");if(t){t.nodeValue=v;}}return this;};d.prototype.setSubtitle=function(v){this.setProperty("subtitle",v,true);var D=this.getDomRef();if(D){var s=D.querySelector("h2");if(s){s.nodeValue=v;}}return this;};d.prototype.setStatus=function(v){this.setProperty("status",v,true);var D=this.getDomRef();if(D){var s=D.querySelector(".sapFCardStatus");if(s){s.nodeValue=v;}}return this;};d.prototype.setComponent=function(v){var o=this.getComponent(),e=this.getAggregation("_content");if(o!==v&&e){e.destroy();}this.setProperty("component",v,true);if(v){var f=new a({name:v,async:true,propagateModel:true,settings:{verticalSize:this.getVerticalSize(),horizontalSize:this.getHorizontalSize()}});this.setAggregation("_content",f);}return this;};return d;});