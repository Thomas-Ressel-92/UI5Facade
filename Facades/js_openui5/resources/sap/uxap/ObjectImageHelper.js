/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/IconPool","sap/m/Avatar","sap/m/Image"],function(M,I,A,a){"use strict";var O=function(){};O.createObjectImage=function(h){var o,s=h.getObjectImageURI();if(s.indexOf("sap-icon://")===0){o=O.instantiateAvatar(s);o.addStyleClass("sapUxAPObjectPageHeaderObjectImageIcon");}else{o=new a({densityAware:h.getObjectImageDensityAware(),alt:M.escapeSettingsValue(h.getObjectImageAlt()),decorative:false,mode:"Background",backgroundSize:"contain",backgroundPosition:"center"});o.addStyleClass("sapUxAPObjectPageHeaderObjectImage");o.setSrc(s);}if(h.getObjectImageAlt()){o.setTooltip(h.getObjectImageAlt());}return o;};O.instantiateAvatar=function(u){return new A({displaySize:"L",fallbackIcon:u});};O.createPlaceholder=function(){return O.instantiateAvatar(I.getIconURI("picture"));};O.updateAvatarInstance=function(o,s,c){o.setDisplayShape(s);o.setBackgroundColor(c);};O._renderImageAndPlaceholder=function(r,o){var h=o.oHeader,b=o.oObjectImage,p=o.oPlaceholder,i=o.bIsObjectIconAlwaysVisible,c=o.bAddSubContainer,B=o.sBaseClass,s=h.getObjectImageShape(),d=h.getObjectImageBackgroundColor(),S=h.getShowPlaceholder()&&!h.getObjectImageURI(),e=b.isA("sap.m.Avatar");if(h.getShowPlaceholder()){O.updateAvatarInstance(p,s,d);}if(h.getObjectImageURI()||h.getShowPlaceholder()){r.write("<span ");r.addClass(B);r.addClass('sapUxAPObjectPageHeaderObjectImage-'+s);if(i){r.addClass('sapUxAPObjectPageHeaderObjectImageForce');}r.writeClasses();r.write(">");if(c){r.write("<span class='sapUxAPObjectPageHeaderObjectImageContainerSub'>");}if(e){O.updateAvatarInstance(b,s,d);r.write("<div");r.addClass("sapUxAPObjectPageHeaderObjectImage");r.addClass("sapUxAPObjectPageHeaderPlaceholder");r.writeClasses();r.write(">");}if(h.getObjectImageURI()){r.renderControl(b);}O._renderPlaceholder(r,p,S);if(e){r.write("</div>");}if(c){r.write("</span>");}r.write("</span>");}};O._renderPlaceholder=function(r,p,v){r.write("<div");r.addClass('sapUxAPObjectPageHeaderPlaceholder');r.addClass('sapUxAPObjectPageHeaderObjectImage');if(!v){r.addClass('sapUxAPHidePlaceholder');}r.writeClasses();r.write(">");r.renderControl(p);r.write("</div>");};return O;},false);
