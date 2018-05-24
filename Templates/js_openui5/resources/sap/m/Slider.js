/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','./SliderTooltipContainer','./SliderTooltip','./SliderUtilities','./ResponsiveScale','sap/ui/core/InvisibleText','sap/ui/core/library','sap/ui/core/ResizeHandler','./SliderRenderer'],function(q,l,C,E,S,a,b,R,I,c,d,e){"use strict";var t=l.touch;var f=C.extend("sap.m.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0},showHandleTooltip:{type:"boolean",group:"Appearance",defaultValue:true},showAdvancedTooltip:{type:"boolean",group:"Appearance",defaultValue:false},inputsAsTooltips:{type:"boolean",group:"Appearance",defaultValue:false},enableTickmarks:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"scale",aggregations:{_tooltipContainer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},scale:{type:"sap.m.IScale",multiple:false,singularName:"scale"},_tooltips:{type:"sap.m.ISliderTooltip",multiple:true,visibility:"hidden"},_handlesLabels:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}},designtime:"sap/m/designtime/Slider.designtime"}});E.apply(f.prototype,[true]);f.prototype._showTooltipsIfNeeded=function(){if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue());}};f.prototype._convertValueToRtlMode=function(v){return this.getMax()-v+this.getMin();};f.prototype._recalculateStyles=function(){var s=this.$();this._fSliderWidth=s.width();this._fSliderPaddingLeft=parseFloat(s.css("padding-left"));this._fSliderOffsetLeft=s.offset().left;this._fHandleWidth=this.$("handle").width();};f.prototype._validateProperties=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),g=false,h=false;if(m>=M){g=true;h=true;q.sap.log.warning("Warning: "+"Property wrong min: "+m+" >= max: "+M+" on ",this);}if(s<=0){q.sap.log.warning("Warning: "+"The step could not be negative on ",this);}if(s>(M-m)&&!g){h=true;q.sap.log.warning("Warning: "+"Property wrong step: "+s+" > max: "+M+" - "+"min: "+m+" on ",this);}return h;};f.prototype._getPercentOfValue=function(v){return b.getPercentOfValue(v,this.getMin(),this.getMax());};f.prototype._getValueOfPercent=function(p){var m=this.getMin(),v=(p*(this.getMax()-m)/100)+m,n=this.toFixed(v,this.getDecimalPrecisionOfNumber(this.getStep()));return Number(n);};f.prototype._validateStep=function(s){if(typeof s==="undefined"){return 1;}if(typeof s!=="number"){q.sap.log.warning('Warning: "iStep" needs to be a number',this);return 0;}if((Math.floor(s)===s)&&isFinite(s)){return s;}q.sap.log.warning('Warning: "iStep" needs to be a finite interger',this);return 0;};f.prototype._handleSliderResize=function(){if(this.getEnableTickmarks()){this._handleTickmarksResponsiveness();}if(this.getShowAdvancedTooltip()){this._handleTooltipContainerResponsiveness();}};f.prototype._handleTickmarksResponsiveness=function(){var L,o,O,h,s=this.getAggregation("scale"),T=this.$().find(".sapMSliderTick"),i=this.$().find(".sapMSliderTickmarks").width(),g=(i/T.size())>=b.CONSTANTS.TICKMARKS.MIN_SIZE.SMALL;if(this._bTickmarksLastVisibilityState!==g){T.toggle(g);this._bTickmarksLastVisibilityState=g;}L=this.$().find(".sapMSliderTickLabel").toArray();o=parseFloat(L[1].style.left);O=i*o/100;h=s.getHiddenTickmarksLabels(i,L.length,O,b.CONSTANTS.TICKMARKS.MIN_SIZE.WITH_LABEL);L.forEach(function(j,k){j.style.display=h[k]?"none":"inline-block";});};f.prototype._handleTooltipContainerResponsiveness=function(){this.getAggregation("_tooltipContainer").setWidth(this.$().width()+"px");};f.prototype.getDecimalPrecisionOfNumber=function(v){if(Math.floor(v)===v){return 0;}var V=v.toString(),i=V.indexOf("."),g=V.indexOf("e-"),h=g!==-1,j=i!==-1;if(h){var k=+V.slice(g+2);if(j){return k+V.slice(i+1,g).length;}return k;}if(j){return V.length-i-1;}return 0;};f.prototype.toFixed=function(n,D){if(D===undefined){D=this.getDecimalPrecisionOfNumber(n);}if(D>20){D=20;}else if(D<0){D=0;}return n.toFixed(D)+"";};f.prototype.setDomValue=function(n){var D=this.getDomRef();if(!D){return;}var p=Math.max(this._getPercentOfValue(+n),0)+"%",h=this.getDomRef("handle");if(!!this.getName()){this.getDomRef("input").setAttribute("value",n);}if(this.getProgress()){this.getDomRef("progress").style.width=p;}h.style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=p;if(this.getShowAdvancedTooltip()){this.updateAdvancedTooltipDom(n);}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){h.title=n;}h.setAttribute("aria-valuenow",n);};f.prototype.updateAdvancedTooltipDom=function(n){var T=this.getAggregation("_tooltipContainer"),g=this.getAggregation("_tooltips");g[0].setValue(parseFloat(n));T.repositionTooltips(this.getMin(),this.getMax());};f.prototype.getClosestHandleDomRef=function(){return this.getDomRef("handle");};f.prototype._increaseValueBy=function(i){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v+(i||1));n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}};f.prototype._decreaseValueBy=function(D){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v-(D||1));n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}};f.prototype._getLongStep=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),L=(M-m)/10,i=(M-m)/s;return i>10?L:s;};f.prototype._fireChangeAndLiveChange=function(p){this.fireChange(p);this.fireLiveChange(p);};f.prototype.handleTooltipChange=function(o){var n=parseFloat(o.getParameter("value"));this.setValue(n);this._fireChangeAndLiveChange({value:n});};f.prototype.init=function(){this._iActiveTouchId=-1;this._bSetValueFirstCall=true;this._fValueBeforeFocus=0;this._parentResizeHandler=null;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");var T=new S(),o=new a(this.getId()+"-"+"leftTooltip",{change:this.handleTooltipChange.bind(this)});T.addAssociation("associatedTooltips",o);var s=new I({text:this._oResourceBundle.getText("SLIDER_HANDLE")});o.addAriaLabelledBy(s);this.addAggregation("_handlesLabels",s);this.addAggregation("_tooltips",o);this.setAggregation("_tooltipContainer",T);};f.prototype.exit=function(){if(this._oResourceBundle){this._oResourceBundle=null;}if(this._parentResizeHandler){d.deregister(this._parentResizeHandler);this._parentResizeHandler=null;}};f.prototype.onBeforeRendering=function(){var g=this._validateProperties();if(!g){this.setValue(this.getValue());this._sProgressValue=Math.max(this._getPercentOfValue(this.getValue()),0)+"%";}if(this.getShowAdvancedTooltip()){this._forwardProperties(["enabled"],this.getAggregation("_tooltipContainer"));this._forwardPropertiesToTooltip(this.getAggregation("_tooltips")[0]);}if(this.getEnableTickmarks()&&!this.getAggregation("scale")){this.setAggregation("scale",new R(),true);}};f.prototype._forwardProperties=function(p,o){p.forEach(function(P){o.setProperty(P,this.getProperty(P),true);},this);};f.prototype._forwardPropertiesToTooltip=function(T){this._forwardProperties(["min","max","step"],T);T.setProperty("width",this._getMaxTooltipWidth()+"px",true);T.setProperty("editable",this.getInputsAsTooltips(),true);};f.prototype._getMaxTooltipWidth=function(){var A=[Math.abs(this.getMin()),Math.abs(this.getMax())],r=A[0]>A[1]?0:1;return((A[r].toString()).length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*b.CONSTANTS.CHARACTER_WIDTH_PX;};f.prototype.onAfterRendering=function(){if(this.getShowAdvancedTooltip()){this._recalculateStyles();this._handleTooltipContainerResponsiveness();}if(!this._parentResizeHandler){q.sap.delayedCall(0,this,function(){this._parentResizeHandler=d.register(this,this._handleSliderResize.bind(this));});}};f.prototype.ontouchstart=function(o){var m=this.getMin(),T=o.targetTouches[0],n,g=this.getRenderer().CSS_CLASS,s="."+g;o.setMarked();if(o.target.className.indexOf("sapMInput")===-1){o.preventDefault();}this.focus();if(t.countContained(o.touches,this.getId())>1||!this.getEnabled()||o.button||(o.srcControl!==this)){return;}this._iActiveTouchId=T.identifier;q(document).on("touchend"+s+" touchcancel"+s+" mouseup"+s,this._ontouchend.bind(this)).on(o.originalEvent.type==="touchstart"?"touchmove"+s:"touchmove"+s+" mousemove"+s,this._ontouchmove.bind(this));var N=this.getClosestHandleDomRef();if(T.target!==N){q.sap.delayedCall(0,N,"focus");}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(g+"Pressed");if(T.target===this.getDomRef("handle")){this._fDiffX=(T.pageX-q(N).offset().left)+this._fSliderPaddingLeft-(this._fHandleWidth/2);}else{n=(((T.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n);}this.setValue(n);n=this.getValue();if(this._fInitialValue!==n){this.fireLiveChange({value:n});}}};f.prototype._ontouchmove=function(o){o.setMarked();o.preventDefault();if(o.isMarked("delayedMouseEvent")||!this.getEnabled()||o.button){return;}var m=this.getMin(),v=this.getValue(),T=t.find(o.changedTouches,this._iActiveTouchId),p=T?T.pageX:o.pageX,n=(((p-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n);}this.setValue(n);n=this.getValue();if(v!==n){this.fireLiveChange({value:n});}};f.prototype._ontouchend=function(o){var g=this.getRenderer().CSS_CLASS,s="."+g;o.setMarked();if(o.isMarked("delayedMouseEvent")||!this.getEnabled()||o.button){return;}q(document).off(s);var v=this.getValue();this.$("inner").removeClass(g+"Pressed");if(this._fInitialValue!==v){this.fireChange({value:v});}};f.prototype.onfocusin=function(o){this._fValueBeforeFocus=this.getValue();if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);this.updateAdvancedTooltipDom(this.getValue());}};f.prototype.onfocusout=function(o){if(!this.getShowAdvancedTooltip()){return;}var s=q.contains(this.getDomRef(),o.relatedTarget),T=q.contains(this.getAggregation("_tooltipContainer").getDomRef(),o.relatedTarget);if(s||T){return;}this.getAggregation("_tooltipContainer").hide();};f.prototype.onmouseover=function(o){var T,g;if(this.getShowAdvancedTooltip()){this.getAggregation("_tooltipContainer").show(this);g=this.getAggregation("_tooltipContainer");T=q.contains(g.getDomRef(),document.activeElement);if(T){return;}this.updateAdvancedTooltipDom(this.getValue());}};f.prototype.onmouseout=function(o){if(!this.getShowAdvancedTooltip()){return;}var T=this.getAggregation("_tooltipContainer").getDomRef(),s=this.getDomRef(),h=q.contains(s,document.activeElement),g=q.contains(T,document.activeElement);if(!T||h||g){return;}if(q.contains(this.getDomRef(),o.toElement)||(s===o.toElement)){return;}if(q.contains(this.getAggregation("_tooltipContainer").getDomRef(),o.toElement)){return;}this.getAggregation("_tooltipContainer").hide();};f.prototype.onkeydown=function(o){var T=this.getAggregation("_tooltips")[0];if(o.keyCode===b.CONSTANTS.F2_KEYCODE&&T&&T.getEditable()){T.focus();}};f.prototype.onsapincrease=function(o){var v,n;if(o.srcControl!==this){return;}o.preventDefault();o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};f.prototype.onsapincreasemodifiers=function(o){if(o.srcControl!==this||o.altKey){return;}o.preventDefault();o.stopPropagation();o.setMarked();this._increaseValueBy(this._getLongStep());this._showTooltipsIfNeeded();};f.prototype.onsapdecrease=function(o){var v,n;if(o.srcControl!==this){return;}o.preventDefault();o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};f.prototype.onsapdecreasemodifiers=function(o){if(o.srcControl!==this||o.altKey){return;}o.preventDefault();o.stopPropagation();o.setMarked();this._decreaseValueBy(this._getLongStep());this._showTooltipsIfNeeded();};f.prototype.onsapplus=function(o){var v,n;if(o.srcControl!==this){return;}o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};f.prototype.onsapminus=function(o){var v,n;if(o.srcControl!==this){return;}o.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}this._showTooltipsIfNeeded();};f.prototype.onsapescape=function(){this.setValue(this._fValueBeforeFocus);};f.prototype.onsappageup=f.prototype.onsapincreasemodifiers;f.prototype.onsappagedown=f.prototype.onsapdecreasemodifiers;f.prototype.onsaphome=function(o){if(o.srcControl!==this){return;}o.setMarked();var m=this.getMin();o.preventDefault();if(this.getEnabled()&&this.getValue()>m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}this._showTooltipsIfNeeded();};f.prototype.onsapend=function(o){if(o.srcControl!==this){return;}o.setMarked();var m=this.getMax();o.preventDefault();if(this.getEnabled()&&this.getValue()<m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}this._showTooltipsIfNeeded();};f.prototype.getFocusDomRef=function(){return this.getDomRef("handle");};f.prototype.stepUp=function(s){return this.setValue(this.getValue()+(this._validateStep(s)*this.getStep()),{snapValue:false});};f.prototype.stepDown=function(s){return this.setValue(this.getValue()-(this._validateStep(s)*this.getStep()),{snapValue:false});};f.prototype.setValue=function(n,o){if(this._bSetValueFirstCall){this._bSetValueFirstCall=false;return this.setProperty("value",n,true);}var m=this.getMin(),M=this.getMax(),s=this.getStep(),v=this.getValue(),N,g=true,h;if(o){g=!!o.snapValue;}if(typeof n!=="number"||!isFinite(n)){return this;}h=Math.abs((n-m)%s);if(g&&(h!==0)){n=h*2>=s?n+s-h:n-h;}if(n<m){n=m;}else if(n>M){n=M;}N=this.toFixed(n,this.getDecimalPrecisionOfNumber(s));n=Number(N);this.setProperty("value",n,true);if(v!==this.getValue()){this.setDomValue(N);}return this;};return f;});