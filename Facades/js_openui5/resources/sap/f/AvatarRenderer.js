/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/base/security/encodeXML"],function(l,e){"use strict";var A=l.AvatarSize;var a=l.AvatarType;var b={};b.render=function(r,o){var i=o.getInitials(),s=o._getActualDisplayType(),d=o.getDisplaySize(),D=o.getDisplayShape(),I=o.getImageFitType(),c=o.getCustomDisplaySize(),C=o.getCustomFontSize(),S=o._getEscapedSrc(),f="sapFAvatar",t=o.getTooltip_AsString(),g=o._getDefaultTooltip(),L=o.getAriaLabelledBy(),h=o.getAriaDescribedBy(),j=t&&i?g+" "+t:g,k=i?g+" "+i:g;r.write("<span");r.writeControlData(o);r.addClass(f);r.addClass(f+d);r.addClass(f+s);r.addClass(f+D);if(o.hasListeners("press")){r.addClass("sapMPointer");r.addClass("sapFAvatarFocusable");r.writeAttribute("role","button");r.writeAttribute("tabIndex",0);}else{r.writeAttribute("role","img");}if(s===a.Image){r.addClass(f+s+I);r.addStyle("background-image","url('"+e(S)+"')");}if(d===A.Custom){r.addStyle("width",c);r.addStyle("height",c);r.addStyle("font-size",C);}if(t){r.writeAttributeEscaped("title",t);r.writeAttributeEscaped("aria-label",j);}else{r.writeAttributeEscaped("aria-label",k);}if(L&&L.length>0){r.writeAttributeEscaped("aria-labelledby",L.join(" "));}if(h&&h.length>0){r.writeAttributeEscaped("aria-describedby",h.join(" "));}r.writeClasses();r.writeStyles();r.write(">");if(s===a.Icon){r.renderControl(o._getIcon());}else if(s===a.Initials){r.write("<span");r.addClass(f+"InitialsHolder");r.writeClasses();r.write(">");r.writeEscaped(i);r.write("</span>");}if(o._fnLightBoxOpen){r.write("<span class=\"sapFAvatarMagnifyingGlass\"></span>");}r.write("</span>");};return b;},true);