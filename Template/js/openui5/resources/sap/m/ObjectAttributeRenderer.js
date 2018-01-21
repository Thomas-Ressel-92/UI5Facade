/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={};O.render=function(r,o){var p=o.getParent(),t=o.getTooltip_AsString();if(o._isEmpty()){return;}r.write("<div");r.writeControlData(o);r.addClass("sapMObjectAttributeDiv");if(o._isSimulatedLink()){r.addClass("sapMObjectAttributeActive");r.writeAttribute("tabindex","0");r.writeAccessibilityState(o,{role:"link"});}r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}r.write(">");if(o.getActive()&&!o.getCustomContent()||(p instanceof sap.m.ObjectHeader)){this.renderActiveTitle(r,o);this.renderActiveText(r,o,p);}else{r.renderControl(o._getUpdatedTextControl());}r.write("</div>");};O.renderActiveTitle=function(r,o){if(!o.getProperty("title")){return;}r.write("<span id=\""+o.getId()+"-title\"");r.addClass("sapMObjectAttributeTitle");r.writeClasses();r.write(">");r.writeEscaped(o.getProperty("title"));r.write("</span>");r.write("<span id=\""+o.getId()+"-colon\"");r.addClass("sapMObjectAttributeColon");r.writeClasses();r.write(">");r.write(":&nbsp;");r.write("</span>");};O.renderActiveText=function(r,o,p){var t=o.getTextDirection(),a=o.getAggregation("customContent");r.write("<span id=\""+o.getId()+"-text\"");r.addClass("sapMObjectAttributeText");if(t&&t!==sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}r.writeClasses();r.write(">");if(a&&p){if((p instanceof sap.m.ObjectHeader)&&!o.getParent().getResponsive()){o._setControlWrapping(a,true,sap.m.ObjectAttribute.MAX_LINES.MULTI_LINE);}else{o._setControlWrapping(a,false,sap.m.ObjectAttribute.MAX_LINES.SINGLE_LINE);}r.renderControl(a);}else{r.writeEscaped(o.getProperty("text"));}r.write("</span>");};return O;},true);
