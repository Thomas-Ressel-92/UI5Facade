/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Icon","./Input","./InputBase","./InputRenderer","sap/ui/core/Control","sap/ui/core/IconPool",'sap/ui/core/LabelEnablement','sap/ui/core/message/MessageMixin','sap/ui/model/ValidateException','sap/ui/Device',"sap/ui/core/library","sap/ui/core/Renderer","sap/m/library","./StepInputRenderer","sap/ui/events/KeyCodes","sap/base/Log"],function(I,a,b,c,C,d,L,M,V,D,e,R,l,S,K,f){"use strict";var g=l.InputType;var T=e.TextAlign;var h=e.ValueState;var j=l.StepInputValidationMode;var k=l.StepInputStepModeType;var m=C.extend("sap.m.StepInput",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/StepInput.designtime",properties:{min:{type:"float",group:"Data"},max:{type:"float",group:"Data"},step:{type:"float",group:"Data",defaultValue:1},stepMode:{type:"sap.m.StepInputStepModeType",group:"Data",defaultValue:k.AdditionAndSubtraction},largerStep:{type:"float",group:"Data",defaultValue:2},value:{type:"float",group:"Data",defaultValue:0},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension"},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:h.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},displayValuePrecision:{type:"int",group:"Data",defaultValue:0},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'50%'},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:T.End},validationMode:{type:"sap.m.StepInputValidationMode",group:"Misc",defaultValue:j.FocusOut}},aggregations:{_input:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},constructor:function(i,s){C.prototype.constructor.apply(this,arguments);if(this.getEditable()){this._getOrCreateDecrementButton();this._getOrCreateIncrementButton();}if(typeof i!=="string"){s=i;}if(s&&s.value===undefined){this.setValue(this._getDefaultValue(undefined,s.max,s.min));}}});var o=sap.ui.getCore().getLibraryResourceBundle("sap.m");m.STEP_INPUT_INCREASE_BTN_TOOLTIP=o.getText("STEP_INPUT_INCREASE_BTN");m.STEP_INPUT_DECREASE_BTN_TOOLTIP=o.getText("STEP_INPUT_DECREASE_BTN");m.INITIAL_WAIT_TIMEOUT=500;m.ACCELLERATION=0.8;m.MIN_WAIT_TIMEOUT=50;m.INITIAL_SPEED=120;m._TOLERANCE=10;var F=["enabled","editable","name","placeholder","required","valueStateText","description","fieldWidth","textAlign"];var N=R.extend(c);N.writeInnerAttributes=function(r,i){var s=i.getParent();r.writeAttribute("type",i.getType().toLowerCase());if(sap.ui.getCore().getConfiguration().getRTL()){r.writeAttribute("dir","ltr");}r.writeAccessibilityState(s);};N.getAccessibilityState=function(i){var A=c.getAccessibilityState(i),s=i.getParent(),q=s._getMin(),r=s._getMax(),t=s.getValue(),u=s.getDescription(),v=s.getAriaLabelledBy(),w=L.getReferencingLabels(s),x=s.getAriaDescribedBy().join(" "),y;A["role"]="spinbutton";A["valuenow"]=t;if(u){v.push(s._getInput().getId()+"-descr");}y=w.concat(v).join(" ");if(typeof q==="number"){A["valuemin"]=q;}if(typeof r==="number"){A["valuemax"]=r;}if(x){A["describedby"]=x;}if(y){A["labelledby"]=y;}return A;};var n=a.extend("sap.m.internal.NumericInput",{metadata:{library:"sap.m"},constructor:function(i,s){return a.apply(this,arguments);},renderer:N});n.prototype.onBeforeRendering=function(){b.prototype.onBeforeRendering.call(this);this._deregisterEvents();};n.prototype.setValue=function(v){a.prototype.setValue.apply(this,arguments);if(this.getDomRef()){document.getElementById(this.getId()+"-inner").setAttribute("aria-valuenow",v);}return this;};M.call(m.prototype);m.prototype.init=function(){this._iRealPrecision=0;this._attachChange();this._bPaste=false;this._onmousewheel=this._onmousewheel.bind(this);};m.prototype.onBeforeRendering=function(){var i=this._getMin(),q=this._getMax(),v=this.getAggregation("_input")._$input.val()||this.getValue(),E=this.getEditable();this._iRealPrecision=this._getRealValuePrecision();this._getInput().setValue(this._getFormatedValue(v));this._getInput().setValueState(this.getValueState());this._getInput().setTooltip(this.getTooltip());this._getOrCreateDecrementButton().setVisible(E);this._getOrCreateIncrementButton().setVisible(E);this._disableButtons(v,q,i);this.$().unbind(D.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);};m.prototype.onAfterRendering=function(){this.$().bind(D.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);};m.prototype.exit=function(){this.$().unbind(D.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);};m.prototype.setProperty=function(P,v,s){C.prototype.setProperty.call(this,P,v,s);if(F.indexOf(P)>-1){this._getInput().setProperty(P,this.getProperty(P),s);}return this;};m.prototype.setValidationMode=function(v){if(this.getValidationMode()!==v){switch(v){case j.FocusOut:this._detachLiveChange();break;case j.LiveChange:this._attachLiveChange();break;}this.setProperty("validationMode",v);}return this;};m.prototype.setMin=function(i){if(i!==undefined&&!this._validateOptionalNumberProperty("min",i)){return this;}return this.setProperty("min",i);};m.prototype.setMax=function(i){if(i!==undefined&&!this._validateOptionalNumberProperty("max",i)){return this;}return this.setProperty("max",i);};m.prototype._validateOptionalNumberProperty=function(i,v){if(this._isNumericLike(v)){return true;}f.error("The value of property '"+i+"' must be a number");return false;};m.prototype.setDisplayValuePrecision=function(i){var v;if(p(i)){v=parseInt(i);}else{v=0;f.warning(this+": ValuePrecision ("+i+") is not correct. It should be a number between 0 and 20! Setting the default ValuePrecision:0.");}return this.setProperty("displayValuePrecision",v);};m.prototype._getIncrementButton=function(){var i=this._getInput().getAggregation("_endIcon");return i?i[0]:null;};m.prototype._getDecrementButton=function(){var i=this._getInput().getAggregation("_beginIcon");return i?i[0]:null;};m.prototype._createIncrementButton=function(){var t=this;var i=this._getInput().addEndIcon({src:d.getIconURI("add"),id:this.getId()+"-incrementBtn",noTabStop:true,press:this._handleButtonPress.bind(this,true),tooltip:m.STEP_INPUT_INCREASE_BTN_TOOLTIP});i.getEnabled=function(){return!this._shouldDisableIncrementButton(this.getValue(),this._getMax());}.bind(this);i.addEventDelegate({onAfterRendering:function(){i.$().attr("tabindex","-1");t._attachEvents(i,true);}});return i;};m.prototype._createDecrementButton=function(){var t=this;var i=this._getInput().addBeginIcon({src:d.getIconURI("less"),id:this.getId()+"-decrementBtn",noTabStop:true,press:this._handleButtonPress.bind(this,false),tooltip:m.STEP_INPUT_DECREASE_BTN_TOOLTIP});i.getEnabled=function(){return!this._shouldDisableDecrementButton(this.getValue(),this._getMin());}.bind(this);i.addEventDelegate({onAfterRendering:function(){i.$().attr("tabindex","-1");t._attachEvents(i,false);}});return i;};m.prototype._getInput=function(){if(!this.getAggregation("_input")){var i=new n({id:this.getId()+"-input",textAlign:this.getTextAlign(),type:g.Number,editable:this.getEditable(),enabled:this.getEnabled(),description:this.getDescription(),fieldWidth:this.getFieldWidth(),liveChange:this._inputLiveChangeHandler});this.setAggregation("_input",i);}return this.getAggregation("_input");};m.prototype._handleButtonPress=function(i){var q=this._calculateNewValue(1,i);this._btndown=undefined;this.setValue(q.value);if(this._sOldValue!==this.getValue()){this._verifyValue();this.fireChange({value:this.getValue()});}this.$().focus();return this;};m.prototype._disableButtons=function(v,i,q){if(!this._isNumericLike(v)){return;}var r=this._getIncrementButton(),s=this._getDecrementButton(),t=this._shouldDisableDecrementButton(v,q),u=this._shouldDisableIncrementButton(v,i);s&&s.toggleStyleClass("sapMStepInputIconDisabled",t);r&&r.toggleStyleClass("sapMStepInputIconDisabled",u);return this;};m.prototype._shouldDisableDecrementButton=function(v,i){var q=this._isNumericLike(i),E=this.getEnabled(),r=q&&i>=v;return E?r:true;};m.prototype._shouldDisableIncrementButton=function(v,i){var q=this._isNumericLike(i),E=this.getEnabled(),r=q&&i<=v;return E?r:true;};m.prototype._verifyValue=function(){var i=this._getMin(),q=this._getMax(),v=parseFloat(this._getInput().getValue()),r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core"),B=this.getBinding("value"),s=B&&B.getType&&B.getType(),t=s&&s.oConstraints&&s.oConstraints.maximum,u=s&&s.oConstraints&&s.oConstraints.minimum,w,x=[],H=false,E;if(!this._isNumericLike(v)){return;}E=this;do{H=E.hasListeners("validationError");E=E.getEventingParent();}while(E&&!H);if(this._isNumericLike(q)&&v>q){if(H&&t){return;}w=r.getText("EnterNumberMax",[q]);x.push("maximum");}else if(this._isNumericLike(i)&&v<i){if(H&&u){return;}w=r.getText("EnterNumberMin",[i]);x.push("minimum");}else if(this._areFoldChangeRequirementsFulfilled()&&(v%this.getStep()!==0)){w=r.getText("Float.Invalid");}if(!w){this.setProperty("valueState",h.None,true);this._getInput().setValueState(h.None);return;}if(H){this.fireValidationError({element:this,exception:new V(w,x),id:this.getId(),message:w,property:"value"});}else{this.setProperty("valueState",h.Error,true);this._getInput().setValueState(h.Error);this._getInput().setValueStateText(w);}};m.prototype.setValue=function(v){var r;if(v==undefined){v=0;}this._sOldValue=this.getValue();if(!this._validateOptionalNumberProperty("value",v)){return this;}this._getInput().setValue(this._getFormatedValue(v));this._disableButtons(this._getInput().getValue(),this._getMax(),this._getMin());r=this.setProperty("value",parseFloat(v),true);this._iRealPrecision=this._getRealValuePrecision();return r;};m.prototype._getFormatedValue=function(v){var P=this.getDisplayValuePrecision(),i,s;if(v==undefined){v=this.getValue();}if(P<=0){return parseFloat(v).toFixed(0);}s=v.toString().split(".");if(s.length===2){i=s[1].length;if(i>P){return parseFloat(v).toFixed(P);}return s[0]+"."+this._padZeroesRight(s[1],P);}else{return v.toString()+"."+this._padZeroesRight("0",P);}};m.prototype._padZeroesRight=function(v,q){var r="",s=v.length;for(var i=s;i<q;i++){r=r+"0";}r=v+r;return r;};m.prototype.onsappageup=function(E){this._applyValue(this._calculateNewValue(this.getLargerStep(),true).displayValue);this._verifyValue();E.preventDefault();};m.prototype.onsappagedown=function(E){this._applyValue(this._calculateNewValue(this.getLargerStep(),false).displayValue);this._verifyValue();E.preventDefault();};m.prototype.onsappageupmodifiers=function(E){if(this._isNumericLike(this._getMax())&&!(E.ctrlKey||E.metaKey||E.altKey)&&E.shiftKey){this._applyValue(this._getMax());}};m.prototype.onsappagedownmodifiers=function(E){if(this._isNumericLike(this._getMin())&&!(E.ctrlKey||E.metaKey||E.altKey)&&E.shiftKey){this._applyValue(this._getMin());}};m.prototype.onsapup=function(E){E.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);this._verifyValue();};m.prototype.onsapdown=function(E){E.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);this._verifyValue();};m.prototype._onmousewheel=function(E){var i=this.getDomRef().contains(document.activeElement);if(i){E.preventDefault();var O=E.originalEvent,q=O.detail?(-O.detail>0):(O.wheelDelta>0);this._applyValue(this._calculateNewValue(1,q).displayValue);this._verifyValue();}};m.prototype.onkeydown=function(E){var v=false;this._bPaste=(E.ctrlKey||E.metaKey)&&(E.which===K.V);if(E.which===K.ARROW_UP&&!E.altKey&&E.shiftKey&&(E.ctrlKey||E.metaKey)){this._applyValue(this._getMax());v=true;}if(E.which===K.ARROW_DOWN&&!E.altKey&&E.shiftKey&&(E.ctrlKey||E.metaKey)){this._applyValue(this._getMin());v=true;}if(E.which===K.ARROW_UP&&!(E.ctrlKey||E.metaKey||E.altKey)&&E.shiftKey){E.preventDefault();this._applyValue(this._calculateNewValue(this.getLargerStep(),true).displayValue);v=true;}if(E.which===K.ARROW_DOWN&&!(E.ctrlKey||E.metaKey||E.altKey)&&E.shiftKey){E.preventDefault();this._applyValue(this._calculateNewValue(this.getLargerStep(),false).displayValue);v=true;}if(E.which===K.ARROW_UP&&(E.ctrlKey||E.metaKey)){E.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);v=true;}if(E.which===K.ARROW_DOWN&&(E.ctrlKey||E.metaKey)){E.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);v=true;}if(E.which===K.ARROW_UP&&E.altKey){E.preventDefault();this._applyValue(this._calculateNewValue(1,true).displayValue);v=true;}if(E.which===K.ARROW_DOWN&&E.altKey){E.preventDefault();this._applyValue(this._calculateNewValue(1,false).displayValue);v=true;}if(v){this._verifyValue();}};m.prototype.onsapescape=function(E){this._getInput().onsapescape(E);};m.prototype._attachLiveChange=function(){this._getInput().attachLiveChange(this._liveChange,this);};m.prototype._detachLiveChange=function(){this._getInput().detachLiveChange(this._liveChange,this);};m.prototype._attachChange=function(){this._getInput().attachChange(this._change,this);};m.prototype._liveChange=function(){this._verifyValue();this._disableButtons(this._getInput().getValue(),this._getMax(),this._getMin());};m.prototype._change=function(E){this._sOldValue=this.getValue();this.setValue(this._getDefaultValue(this._getInput().getValue(),this._getMax(),this._getMin()));if(this._sOldValue!==this.getValue()&&!this._isButtonFocused()){this._verifyValue();this.fireChange({value:this.getValue()});}};m.prototype._applyValue=function(i){if(!this.getEditable()||!this.getEnabled()){return;}this.getAggregation("_input")._$input.val(this._getFormatedValue(i));};m.prototype._calculateNewValue=function(s,i){var q=this.getStep(),r=this._getMax(),t=this._getMin(),u=this.getValue(),v=parseFloat(this._getDefaultValue(this._getInput().getValue(),r,t)),w=i?1:-1,x=Math.abs(q)*Math.abs(s),y=v+w*x,z,A,B=this.getDisplayValuePrecision();if(B>0){z=this._sumValues(v,x,w,B);}else{z=y;}if(this._areFoldChangeRequirementsFulfilled()){y=z=A=this._calculateClosestFoldValue(v,x,w);}else{A=this._sumValues(u,x,w,this._iRealPrecision);}if(this._isNumericLike(r)&&y>=r){A=r;z=r;}if(this._isNumericLike(t)&&y<=t){A=t;z=t;}return{value:A,displayValue:z};};m.prototype._getRealValuePrecision=function(){var s=this.getValue().toString().split("."),i=this.getStep().toString().split("."),q,r;q=(!s[1])?0:s[1].length;r=(!i[1])?0:i[1].length;return(q>r)?q:r;};m.prototype._getOrCreateDecrementButton=function(){return this._getDecrementButton()||this._createDecrementButton();};m.prototype._getOrCreateIncrementButton=function(){return this._getIncrementButton()||this._createIncrementButton();};m.prototype._inputLiveChangeHandler=function(E){var v=this.getParent()._restrictCharsWhenDecimal(E);this.setProperty("value",v?v:E.getParameter("newValue"),true);};m.prototype._restrictCharsWhenDecimal=function(E){var i=E.getParameter("value").indexOf("."),q=this.getDisplayValuePrecision(),v;if(i>0&&q>0){var s=E.getParameter("value"),r=s.split('.')[1],t=r?r.length:0,u=E.getSource().getProperty("value"),w=s.split('.')[0],x=u.substring(u.indexOf('.')+1,u.length);if(!this._bPaste){if(t>q){v=w+"."+x;this._showWrongValueVisualEffect();}}else{if(s.indexOf(".")){v=s.split('.')[0]+"."+r.substring(0,q);}this._bPaste=false;}}this._getInput().updateDomValue(v);return v;};m.prototype._showWrongValueVisualEffect=function(){var O=this.getValueState(),i=this._getInput();if(O===h.Error){return;}i.setValueState(h.Error);setTimeout(i["setValueState"].bind(i,O),1000);};m.prototype._getDefaultValue=function(v,i,q){if(v!==""&&v!==undefined){return this._getInput().getValue();}if(this._isNumericLike(q)&&q>0){return q;}else if(this._isNumericLike(i)&&i<0){return i;}else{return 0;}};m.prototype._isNumericLike=function(v){return!isNaN(v)&&v!==null&&v!=="";};m.prototype._isInteger=function(v){return v===parseInt(v);};m.prototype._isButtonFocused=function(){return document.activeElement===this._getIncrementButton().getDomRef()||document.activeElement===this._getDecrementButton().getDomRef();};m.prototype._sumValues=function(v,i,s,P){var q=Math.pow(10,P),r=parseInt((v*q).toFixed(10)),t=parseInt((i*q).toFixed(10));return(r+(s*t))/q;};m.prototype._areFoldChangeRequirementsFulfilled=function(){return this.getStepMode()===k.Multiple&&this.getDisplayValuePrecision()===0&&this._isInteger(this.getStep())&&this._isInteger(this.getLargerStep());};m.prototype._calculateClosestFoldValue=function(v,s,i){var r=Math.floor(v),q=s;do{r+=i;q--;}while(r%s!==0&&q);if(r%s!==0){f.error("Wrong next/previous value "+r+" for "+v+", step: "+s+" and sign: "+i,this);}return r;};function p(v){return(typeof(v)==='number')&&!isNaN(v)&&v>=0&&v<=20;}m.prototype._calcWaitTimeout=function(){this._speed*=m.ACCELLERATION;this._waitTimeout=((this._waitTimeout-this._speed)<m.MIN_WAIT_TIMEOUT?m.MIN_WAIT_TIMEOUT:(this._waitTimeout-this._speed));return this._waitTimeout;};m.prototype._spinValues=function(i){var t=this;if(this._btndown){this._spinTimeoutId=setTimeout(function(){if(t._btndown){var q=t._calculateNewValue(1,i);t.setValue(q.value);t._verifyValue();if(!t._getIncrementButton().getEnabled()||!t._getDecrementButton().getEnabled()){_.call(t);t.fireChange({value:t.getValue()});}t._spinValues(i);}},t._calcWaitTimeout());}};m.prototype._attachEvents=function(B,i){var t=this;var E={onmousedown:function(q){if(q.button===0&&!t._btndown){t._waitTimeout=m.INITIAL_WAIT_TIMEOUT;t._speed=m.INITIAL_SPEED;t._btndown=true;t._spinValues(i);}},onmouseup:function(q){if(t._btndown){_.call(t);}},onmouseout:function(q){if(t._btndown){_.call(t);t.fireChange({value:t.getValue()});}},oncontextmenu:function(q){q.stopImmediatePropagation(true);if(q.originalEvent&&q.originalEvent.cancelable){q.preventDefault();}q.stopPropagation();}};B.addDelegate(E,true);};m.prototype._getMin=function(){var B=this.getBinding("value"),i=B&&B.getType&&B.getType(),s=i&&i.oConstraints&&i.oConstraints.minimum;return s?parseFloat(s):this.getMin();};m.prototype._getMax=function(){var B=this.getBinding("value"),i=B&&B.getType&&B.getType(),s=i&&i.oConstraints&&i.oConstraints.maximum;return s?parseFloat(s):this.getMax();};m.prototype.getIdForLabel=function(){return this.getAggregation("_input").getIdForLabel();};function _(){if(this._btndown){this._btndown=undefined;clearTimeout(this._spinTimeoutId);this._waitTimeout=500;this._speed=120;}}return m;});
