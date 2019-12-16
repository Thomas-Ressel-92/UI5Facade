/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/f/cards/BaseContent","sap/m/HBox","sap/m/VBox","sap/m/Text","sap/m/Title","sap/f/Avatar","sap/m/Link","sap/m/Label","sap/ui/core/ResizeHandler","sap/ui/layout/AlignedFlowLayout","sap/ui/dom/units/Rem","sap/f/cards/BindingHelper","sap/f/cards/IconFormatter"],function(l,B,H,V,T,a,A,L,b,R,c,d,e,I){"use strict";var f=l.cards.AreaType;var O=B.extend("sap.f.cards.ObjectContent",{renderer:{}});O.prototype._getRootContainer=function(){if(this._bIsBeingDestroyed){return null;}var o=this.getAggregation("_content");if(!o){o=new c();this.setAggregation("_content",o);}this._sResizeListenerId=R.register(o,this.onAlignedFlowLayoutResize.bind(this));return o;};O.prototype.onAlignedFlowLayoutResize=function(E){if(E&&(E.size.width===E.oldSize.width)&&!E.control){return;}var C=E.control,m=C.getMinItemWidth(),n=C.getContent().length,M;if(m.lastIndexOf("rem")!==-1){M=d.toPx(m);}else if(m.lastIndexOf("px")!==-1){M=parseFloat(m);}var i=Math.floor(E.size.width/M);if(i>n){i=n;}if(this._iColsOld===i){return;}this._iColsOld=i;var g=i-1,r=Math.ceil(n/i);C.getContent().forEach(function(o,h){o.addStyleClass("sapFCardObjectSpaceBetweenGroup");if(g===h&&g<n){o.removeStyleClass("sapFCardObjectSpaceBetweenGroup");g+=i;}if(h+1>(r-1)*i){o.addStyleClass("sapFCardObjectGroupLastInColumn");}else{o.removeStyleClass("sapFCardObjectGroupLastInColumn");}});};O.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId="";}};O.prototype.setConfiguration=function(C){B.prototype.setConfiguration.apply(this,arguments);if(!C){return this;}if(C.groups){this._addGroups(C);}return this;};O.prototype._addGroups=function(C){var o=this._getRootContainer();var g=C.groups||[];g.forEach(function(G){var h=new V().addStyleClass("sapFCardObjectGroup");var t=new a({text:G.title}).addStyleClass("sapFCardObjectItemTitle");h.addItem(t);G.items.forEach(function(i){var j,v=i.label,k=i.value,m,n,p=[];if(v){v=e.formattedProperty(v,function(w){return w&&w[w.length-1]===":"?w:w+=":";});m=new b({text:v}).addStyleClass("sapFCardObjectItemLabel");}if(k){switch(i.type){case'link':j=new L({href:i.url||k,text:k,target:i.target||'_blank'});break;case'email':if(i.value){p.push(jQuery.extend({},i.value));}if(i.emailSubject){p.push(jQuery.extend({},i.emailSubject));}n=e.formattedProperty(p,function(w,E){if(E){return"mailto:"+w+"?subject="+E;}else{return"mailto:"+w;}});j=new L({href:n,text:k});break;case'phone':n=e.formattedProperty(k,function(w){return"tel:"+w;});j=new L({href:n,text:k});break;default:j=new T({text:k});break;}}if(j){j.addStyleClass("sapFCardObjectItemText");}if(i.icon){var s=e.formattedProperty(i.icon.src,function(w){return I.formatSrc(w,this._sAppId);}.bind(this));var q=new A({customDisplaySize:"2.5rem",displaySize:"Custom",src:s}).addStyleClass("sapFCardObjectItemAvatar sapFCardObjectItemLabel");var r=new V({items:[m,j]});var u=new H({items:[q,r]});h.addItem(u);}else{h.addItem(m);h.addItem(j);}},this);o.addContent(h);},this);this._oActions.setAreaType(f.Content);this._oActions.attach(C,this);};return O;});
