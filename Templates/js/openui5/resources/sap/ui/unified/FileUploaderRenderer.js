/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/unified/library'],function(q,l){"use strict";var F=function(){};F.render=function(r,f){var a=sap.ui.getCore().getConfiguration().getAccessibility(),e=f.getEnabled();r.write('<div');r.writeControlData(f);r.addClass("sapUiFup");if(f.getButtonOnly()){r.addClass("sapUiFupButtonOnly");}var c=l.FileUploaderHelper.addFormClass();if(c){r.addClass(c);}if(!e){r.addClass("sapUiFupDisabled");}r.writeClasses();r.write('>');r.write('<form style="display:inline-block" encType="multipart/form-data" method="post"');r.writeAttribute('id',f.getId()+'-fu_form');r.writeAttributeEscaped('action',f.getUploadUrl());r.writeAttribute('target',f.getId()+'-frame');r.write('>');r.write('<div ');if(!f.bMobileLib){r.write('class="sapUiFupInp"');}if(a){r.writeAttribute("role","textbox");r.writeAttribute("aria-readonly","true");}r.write('>');if(!f.getButtonOnly()){r.write('<div class="sapUiFupGroup" border="0" cellPadding="0" cellSpacing="0"><div><div>');}else{r.write('<div class="sapUiFupGroup" border="0" cellPadding="0" cellSpacing="0"><div><div style="display:none">');}r.renderControl(f.oFilePath);r.write('</div><div>');r.renderControl(f.oBrowse);var A;var t="";if(f.getTooltip()){t=f.getTooltip_AsString();}var p="";if(f.getPlaceholder()){p=f.getPlaceholder();}var v="";if(f.getValue()){v=f.getValue();}var b="";if(f.getButtonText()){b=f.getButtonText();}else{b=f.getBrowseText();}if(!v){A=t+" "+p+" "+b;}else{A=t+" "+v+" "+b;}r.write('<span id="'+f.getId()+'-AccDescr" class="sapUiInvisibleText" aria-hidden="true">');r.writeEscaped(A+" "+f._sAccText);r.write('</span>');r.write('</div></div></div>');var n=f.getName()||f.getId();r.write('<div class="sapUiFupInputMask"');if(t.length){r.writeAttributeEscaped('title',t);}r.write('>');r.write('<input type="hidden" name="_charset_" aria-hidden="true">');r.write('<input type="hidden" id="'+f.getId()+'-fu_data" aria-hidden="true"');r.writeAttributeEscaped('name',n+'-data');r.writeAttributeEscaped('value',f.getAdditionalData()||"");r.write('>');q.each(f.getParameters(),function(i,P){r.write('<input type="hidden" aria-hidden="true" ');r.writeAttributeEscaped('name',P.getName()||"");r.writeAttributeEscaped('value',P.getValue()||"");r.write('>');});r.write('</div>');r.write('</div>');r.write('</form>');r.write('</div>');};return F;},true);