/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./TabStripItem','sap/ui/Device','sap/ui/core/InvisibleText'],function(T,D,I){"use strict";var a={};a.LEFT_OVERRFLOW_BTN_CLASS_NAME="sapMTSLeftOverflowButtons";a.RIGHT_OVERRFLOW_BTN_CLASS_NAME="sapMTSRightOverflowButtons";a.render=function(r,c){if(!c.getVisible()){return;}this.beginTabStrip(r,c);if(D.system.phone===true){this.renderTouchArea(r,c);}else{r.write("<div id='"+c.getId()+"-leftOverflowButtons' class='"+this.LEFT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(c.getAggregation("_leftArrowButton")){this.renderLeftOverflowButtons(r,c,false);}r.write("</div>");this.beginTabsContainer(r,c);this.renderItems(r,c);this.endTabsContainer(r);r.write("<div id='"+c.getId()+"-rightOverflowButtons' class='"+this.RIGHT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(c.getAggregation("_rightArrowButton")){this.renderRightOverflowButtons(r,c,false);}r.write("</div>");this.renderTouchArea(r,c);}this.endTabStrip(r);};a.renderItems=function(r,c){var i=c.getItems(),s=c.getSelectedItem();i.forEach(function(o){var d=s&&s===o.getId();this.renderItem(r,c,o,d);},this);};a.renderItem=function(r,c,i,s){var t=i.getTooltip(),d=g(i),m=i.getModified();r.write("<div id='"+i.getId()+"'");r.addClass(T.CSS_CLASS);if(m){r.addClass(T.CSS_CLASS_MODIFIED);}if(s){r.addClass(T.CSS_CLASS_SELECTED);}r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}r.writeElementData(i);r.writeAccessibilityState(i,b(i,c,sap.ui.getCore().byId(c.getSelectedItem())));r.write(">");if(i.getIcon()){r.renderControl(i._getImage());}r.write("<div");r.addClass("sapMTSTexts");r.writeClasses();r.write(">");r.write("<div id='"+d+"-addText' class='"+T.CSS_CLASS_TEXT+"'>");this.renderItemText(r,i.getAdditionalText());r.write("</div>");r.write("<div id='"+d+"-text' class='"+T.CSS_CLASS_LABEL+"'>");this.renderItemText(r,i.getText());if(m){r.write("<span id='"+d+"-symbol'");r.addClass(T.CSS_CLASS_MODIFIED_SYMBOL);r.writeClasses();r.writeAttribute("role","presentation");r.writeAttribute("aria-hidden","true");r.write("/>");}r.write("</div>");r.write("</div>");this.renderItemCloseButton(r,i);r.write("</div>");};a.renderItemText=function(r,i){if(i.length>T.DISPLAY_TEXT_MAX_LENGTH){r.writeEscaped(i.slice(0,T.DISPLAY_TEXT_MAX_LENGTH));r.write('...');}else{r.writeEscaped(i);}};a.renderItemCloseButton=function(r,i){r.write("<div class='sapMTSItemCloseBtnCnt'>");r.renderControl(i.getAggregation("_closeButton"));r.write("</div>");};a.beginTabStrip=function(r,c){r.write("<div");r.addClass("sapMTabStribContainer");r.writeClasses();r.write("><div");r.addClass("sapMTabStrip");r.addClass("sapContrastPlus");r.writeControlData(c);r.writeClasses();r.write(">");};a.endTabStrip=function(r){r.write("</div>");r.write("</div>");};a.beginTabsContainer=function(r,c){r.write("<div id='"+c.getId()+"-tabsContainer' class='sapMTSTabsContainer'>");r.write("<div id='"+c.getId()+"-tabs'  class='sapMTSTabs'");r.writeAccessibilityState(c,{role:"tablist"});r.write(">");};a.endTabsContainer=function(r){r.write("</div>");r.write("</div>");};a.renderLeftOverflowButtons=function(r,c,f){r.renderControl(c.getAggregation("_leftArrowButton"));if(f){r.flush(c.$("leftOverflowButtons")[0]);}};a.renderRightOverflowButtons=function(r,c,f){r.renderControl(c.getAggregation("_rightArrowButton"));if(f){r.flush(c.$("rightOverflowButtons")[0]);}};a.renderTouchArea=function(r,c){r.write("<div id='"+c.getId()+"-touchArea'  class='sapMTSTouchArea'>");r.renderControl(c.getAggregation('_select'));r.renderControl(c.getAddButton());r.write("</div>");};function g(i){return i.getId()+"-label";}function b(i,t,s){var c=t.getItems(),d=c.indexOf(i),o=t.getParent(),A={role:"tab"},e=I.getStaticId("sap.m","TABSTRIP_ITEM_CLOSABLE")+" ";e+=I.getStaticId("sap.m",i.getModified()?"TABSTRIP_ITEM_MODIFIED":"TABSTRIP_ITEM_NOT_MODIFIED");A["describedby"]=e;A["posinset"]=d+1;A["setsize"]=c.length;A["labelledby"]=g(i)+"-addText "+g(i)+"-text";if(o&&o.getRenderer&&o.getRenderer().getContentDomId){A["controls"]=o.getRenderer().getContentDomId(o);}if(s&&s.getId()===i.getId()){A["selected"]="true";}else{A["selected"]="false";}return A;}return a;},true);
