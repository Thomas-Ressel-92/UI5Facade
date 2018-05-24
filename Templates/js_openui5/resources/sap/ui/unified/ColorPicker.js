/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/HTML","sap/ui/core/ResizeHandler","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","sap/ui/core/Icon","sap/ui/core/theming/Parameters","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/core/library","./ColorPickerRenderer","sap/ui/Global"],function(q,L,a,H,R,G,b,V,c,I,P,e,D,f,g){"use strict";var h=f.ValueState;var j=L.ColorPickerMode;var k=a.extend("sap.ui.unified.ColorPicker",{metadata:{library:"sap.ui.unified",properties:{colorString:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.ui.unified.ColorPickerMode",group:"Appearance",defaultValue:j.HSV}},aggregations:{_grid:{type:"sap.ui.layout.Grid",group:"Appearance",multiple:false,visibility:"hidden"},_invisibleTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},events:{change:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}},liveChange:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}}}}});var B="",s=sap.ui.resource('sap.ui.unified','img/ColorPicker/Alphaslider_BG.png'),r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),o=L.ColorPickerHelper,F=o.factory,l={};Object.defineProperties(l,{RGB:{value:"RGB"},CPResponsiveClass:{value:"sapUnifiedColorPicker"},CPMatrixClass:{value:"sapUiColorPicker-ColorPickerMatrix"},HSLClass:{value:"sapUiColorPickerHSL"},LabelClass:{value:"sapUiColorPicker-ColorPickerLabels"},UnitLabelClass:{value:"sapUiCPUnitLabel"},HEXClass:{value:"sapUiColorPicker-ColorPickerHexField"},LeftColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsLeft"},RightColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsRight"},SliderClass:{value:"sapUiColorPicker-ColorPickerSlider"},AlphaSliderClass:{value:"sapUiColorPicker-ColorPickerAlphaSlider"},OutputSelectorClass:{value:"sapUiColorPickerHSL-RB"},OutputSelectorRowClass:{value:"sapUiColorPicker-RBRow"},CPBoxClass:{value:"sapUiColorPicker-ColorPickerBox"},CPCircleClass:{value:"sapUiColorPicker-ColorPickerCircle"},LastColumnClass:{value:"sapUiColorPicker-ColorPickerLastColumn"},HideForHSVClass:{value:"hideForHSV"},HideForHSLClass:{value:"hideForHSL"},OldColorClass:{value:"sapUiColorPicker-ColorPickerOldColor"},NewColorClass:{value:"sapUiColorPicker-ColorPickerNewColor"},SwatchesClass:{value:"sapUiColorPicker-swatches"},ArrowClass:{value:"sapUiColorPicker-Arrow"},Colors:{value:{aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'00ffff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000000',blanchedalmond:'ffebcd',blue:'0000ff',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',cyan:'00ffff',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgrey:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkslategrey:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dimgrey:'696969',dodgerblue:'1e90ff',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'ff00ff',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',grey:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgray:'d3d3d3',lightgrey:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslategray:'778899',lightslategrey:'778899',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'00ff00',limegreen:'32cd32',linen:'faf0e6',magenta:'ff00ff',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370db',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'db7093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',red:'ff0000',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',slategrey:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',wheat:'f5deb3',white:'ffffff',whitesmoke:'f5f5f5',yellow:'ffff00',yellowgreen:'9acd32',transparent:'00000000'}}});k.prototype.init=function(){if(D.browser.firefox){B="-moz-linear-gradient";}else if(D.browser.msie){B="-ms-linear-gradient";}else if(D.browser.webkit){B="-webkit-linear-gradient";}else{B="linear-gradient";}this.Color={r:255,g:255,b:255,h:0,s:0,l:100,v:100,a:1,oldA:1,hex:"#ffffff",old:"#ffffff"};this.sHexString="ffffff";this.$CPBox=null;this.$CPCur=null;this.RGB={r:0,g:0,b:0};this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.data("sap-ui-fastnavgroup","true",true);this.bResponsive=o.isResponsive();this._iCPCursorSize=parseInt(P.get("_sap_ui_unified_ColorPicker_CircleSize"),10);this._processChanges=this._processHSVChanges;this._bHSLMode=false;};var m=a.extend("sap.ui.unified._ColorPickerBox",{metadata:{events:{select:{parameters:{value:{type:"int"},saturation:{type:"int"}}},resize:{parameters:{size:{type:"int"}}}}},init:function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL();},exit:function(){if(this._sResizeListener){R.deregister(this._sResizeListener);}},getWidth:function(){return this.$().width();},getOffset:function(){return this.$().offset();},onBeforeRendering:function(){if(this._sResizeListener){R.deregister(this._sResizeListener);}},onAfterRendering:function(){this._handle=this.$().find("> div."+l.CPCircleClass);this._sResizeListener=R.register(this.getDomRef(),this.handleResize.bind(this));},handleResize:function(E){this.fireResize({size:E.size.width});},getHandle:function(){return this._handle;},ontouchstart:function(E){this.handleTouch(E);},ontouchend:function(E){this.handleTouch(E);},ontouchmove:function(E){this.handleTouch(E);},handleTouch:function(E){var v=this.calculateValuesFromEvent(E);if(v){this.fireSelect(v);}},calculateValuesFromEvent:function(E){var x=E.offsetX,y=E.offsetY,i,d=i=this.getWidth(),n,O;E.preventDefault&&E.preventDefault();if(!x){n=E.targetTouches?E.targetTouches[0]:E;if(!n||!n.pageX){n=E;if((!n||!n.pageX)&&E.changedTouches){n=E.changedTouches[0];}}if(!n.pageX){return false;}O=this.getOffset();x=n.pageX-O.left;y=n.pageY-O.top;}x=Math.min(Math.max(x,0),d);y=Math.min(Math.max(y,0),i);if(this.bRtl){x=d-x;}return{value:x/d*100,saturation:(1-y/i)*100};},renderer:function(d,C){d.write("<div");d.addClass(l.CPBoxClass);d.writeControlData(C);d.writeClasses();d.write(">");d.write("<div");d.writeAttribute("id",C.getId()+"-cpCur");d.addClass(l.CPCircleClass);d.writeClasses();d.write("></div>");d.write("</div>");}});k.prototype._createRowFromInput=function(i,t,d,u){var T=r.getText(t),n;n=new c({content:[F.createLabel({text:d,tooltip:T,labelFor:i}).addStyleClass(l.LabelClass),i.setTooltip(T)]});if(u){n.addContent(F.createLabel({text:u,labelFor:i}).addStyleClass(l.UnitLabelClass).addStyleClass(l.LabelClass));}return n;};k.prototype._updateColorStringProperty=function(d,i){var n=this._getCSSColorString();this.setProperty('colorString',n,true);if(i){this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:n});}if(d){this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:n});}};k.prototype._handleCPBoxSelectEvent=function(E){var v=E.getParameter("value"),d=E.getParameter("saturation");this.oSatField.setValue(d);if(this._bHSLMode){this.oLitField.setValue(v);}else{this.oValField.setValue(v);}this._processChanges();this._updateColorStringProperty(false,true);};k.prototype._handleCPBoxResizeEvent=function(E){this._iCPBoxSize=E.getParameter("size");this._updateCursorPosition();};k.prototype._handleCPBoxTouchEndEvent=function(E){this._updateColorStringProperty(true,false);};k.prototype._createInteractionControls=function(){var i=this.getId(),d,A;this.oCPBox=new m(i+"-cpBox",{select:this._handleCPBoxSelectEvent.bind(this),resize:this._handleCPBoxResizeEvent.bind(this)});this.oCPBox.addDelegate({ontouchend:this._handleCPBoxTouchEndEvent.bind(this)});this.oHexField=F.createInput(i+"-hxF",{value:this.Color.hex.substr(1),change:this._handleHexValueChange.bind(this)}).addStyleClass(l.HEXClass);this.oRedField=F.createInput(i+"-rF",{value:this.Color.r,change:this._handleRedValueChange.bind(this)}).addStyleClass(l.LeftColumnInputClass);this.oGreenField=F.createInput(i+"-gF",{value:this.Color.g,change:this._handleGreenValueChange.bind(this)}).addStyleClass(l.LeftColumnInputClass);this.oBlueField=F.createInput(i+"-bF",{value:this.Color.b,change:this._handleBlueValueChange.bind(this)}).addStyleClass(l.LeftColumnInputClass);this.oHueField=F.createInput(i+"-hF",{value:this.Color.h,change:this._handleHueValueChange.bind(this)}).addStyleClass(l.RightColumnInputClass);this.oSatField=F.createInput(i+"-sF",{value:this.Color.s,change:this._handleSatValueChange.bind(this)}).addStyleClass(l.RightColumnInputClass);this.oLitField=F.createInput(i+"-lF",{value:this.Color.l,change:this._handleLitValueChange.bind(this)}).addStyleClass(l.RightColumnInputClass);this.oAlphaField=F.createInput(i+"-aF",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this)}).addStyleClass(l.RightColumnInputClass);this.oValField=F.createInput(i+"-vF",{value:this.Color.v,change:this._handleValValueChange.bind(this)}).addStyleClass(l.RightColumnInputClass);this.oRGBorHSLRBGroup=F.createRadioButtonGroup({columns:2,buttons:[F.createRadioButtonItem({text:l.RGB}),F.createRadioButtonItem({text:L.ColorPickerMode.HSL})],select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:(this.Color.formatHSL?1:0)}).addStyleClass(l.OutputSelectorClass);d=new e({text:r.getText("COLORPICKER_HUE_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",d,true);this.oSlider=F.createSlider(i+"-hSLD",{max:360,step:1,tooltip:r.getText("COLORPICKER_HUE"),value:parseInt(this.oHueField.getValue(),10)}).addStyleClass(l.SliderClass).addAriaLabelledBy(d);this.oSlider.attachEvent("liveChange","liveChange",this._handleSliderChange.bind(this));this.oSlider.attachEvent("change","change",this._handleSliderChange.bind(this));A=new e({text:r.getText("COLORPICKER_ALPHA_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",A,true);this.oAlphaSlider=F.createSlider(i+"-aSLD",{max:1,value:1,step:0.01,tooltip:r.getText("COLORPICKER_ALPHA")}).addStyleClass(l.AlphaSliderClass).addAriaLabelledBy(A);this.oAlphaSlider.attachEvent("liveChange","liveChange",this._handleAlphaSliderChange.bind(this));this.oAlphaSlider.attachEvent("change","change",this._handleAlphaSliderChange.bind(this));};k.prototype._createLayout=function(){var i=this.getId(),d;if(this._bLayoutControlsCreated){return;}this._createInteractionControls();this._oLayoutData={oCPBox:new b({span:"L6 M6 S12"}),icOne:new b({span:"L3 M3 S6"}),icTwo:new b({span:"L3 M3 S6"}),swatches:new b({span:"L3 M3 S12"}),rbg:new b({span:"L6 M8 S12"})};d=new G({containerQuery:true,content:[this.oCPBox.setLayoutData(this._oLayoutData.oCPBox),new V({content:[this._createRowFromInput(this.oRedField,"COLORPICKER_RED","R:"),this._createRowFromInput(this.oGreenField,"COLORPICKER_GREEN","G:"),this._createRowFromInput(this.oBlueField,"COLORPICKER_BLUE","B:"),this._createRowFromInput(this.oHexField,"COLORPICKER_HEX","#:")],layoutData:this._oLayoutData.icOne}),new V({content:[this._createRowFromInput(this.oHueField,"COLORPICKER_HUE","H:"),this._createRowFromInput(this.oSatField,"COLORPICKER_SAT","S:","%"),this._createRowFromInput(this.oLitField,"COLORPICKER_LIGHTNESS","L:","%").addStyleClass(l.HideForHSVClass),this._createRowFromInput(this.oAlphaField,"COLORPICKER_ALPHA","A:").addStyleClass(l.HideForHSVClass),this._createRowFromInput(this.oValField,"COLORPICKER_VALUE","V:").addStyleClass(l.HideForHSLClass)],layoutData:this._oLayoutData.icTwo}).addStyleClass(l.LastColumnClass),new c({content:[new H({content:["<div id='",i,"-ocBox' class='",l.OldColorClass,"'></div>"].join("")}),new I({backgroundColor:"transparent",src:"sap-icon://arrow-right",tooltip:r.getText("COLORPICKER_NEW_OLD_COLOR")}).addStyleClass(l.HideForHSVClass).addStyleClass(l.ArrowClass),new H({content:["<div id='",i,"-ncBox' class='",l.NewColorClass,"'></div>"].join("")})],layoutData:this._oLayoutData.swatches}).addStyleClass(l.SwatchesClass),new c({content:[F.createLabel({text:"Output:",labelFor:this.oRGBorHSLRBGroup}),this.oRGBorHSLRBGroup],layoutData:this._oLayoutData.rbg}).addStyleClass(l.HideForHSVClass).addStyleClass(l.OutputSelectorRowClass),this.oSlider.setLayoutData(new b({span:"L6 M6 S12",linebreak:true})),this.oAlphaSlider.setLayoutData(new b({span:"L6 M6 S12"}))]}).addStyleClass(l.CPMatrixClass);this.setAggregation("_grid",d,true);this._bLayoutControlsCreated=true;this._adaptControlToLibrary();};k.prototype._adaptControlToLibrary=function(){var d;if(!this._bLayoutControlsCreated){return;}d=this.getAggregation("_grid");if(this.bResponsive){if(!D.system.phone&&!q('html').hasClass("sapUiMedia-Std-Phone")){d._setBreakPointTablet(400);}d.addStyleClass(l.CPResponsiveClass);}else{d.setProperty("hSpacing",0,true);d.setProperty("vSpacing",0,true);this._oLayoutData.oCPBox.setSpanS(5);this._oLayoutData.icOne.setSpanS(4);this._oLayoutData.icTwo.setSpanS(3);this._oLayoutData.rbg.setSpanS(8);}this._adaptControlToLibrary=q.noop;};k.prototype._updateControlVisualState=function(){var d=this.getAggregation("_grid");if(!this._bLayoutControlsCreated){return;}if(this.bResponsive){if(this._bHSLMode){d.addStyleClass(l.HSLClass);this._oLayoutData.swatches.setSpanM(4).setLinebreak(true);}else{d.removeStyleClass(l.HSLClass);this._oLayoutData.swatches.setSpanM(3).setLinebreak(false);}}else{if(this._bHSLMode){d.addStyleClass(l.HSLClass);this._oLayoutData.swatches.setSpanS(4).setLinebreak(true);}else{d.removeStyleClass(l.HSLClass);this._oLayoutData.swatches.setSpanS(3).setLinebreak(false);}}};k.prototype._processChanges=q.noop;k.prototype.setMode=function(M,S){switch(M){case L.ColorPickerMode.HSL:this._processChanges=this._processHSLChanges;break;case L.ColorPickerMode.HSV:this._processChanges=this._processHSVChanges;break;default:q.sap.log.error("Control must have a valid mode set to work correct");break;}this._bHSLMode=M===L.ColorPickerMode.HSL;return this.setProperty("mode",M,S);};k.prototype.onBeforeRendering=function(){this._createLayout();this._updateControlVisualState();this._updateColorString();};k.prototype._updateColorString=function(){this._parseColorString(this.getColorString());this.oHexField.setValue(this.Color.hex.substr(1));this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(this.Color.a);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oRGBorHSLRBGroup.setSelectedIndex(this.Color.formatHSL?1:0);}else{this.oValField.setValue(this.Color.v);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oAlphaField.setValue(this.Color.a);}this._updateColorStringProperty(true,true);};k.prototype.isColor=function(C){return this._parseColorString(C,true);};k.prototype._handleSliderChange=function(E,d){var i=parseInt(this.oSlider.getValue(),10);this.oHueField.setValue(i);this._processChanges();this._updateColorStringProperty(d==="change",d==="liveChange");};k.prototype._handleAlphaSliderChange=function(E,d){this.Color.a=this.oAlphaSlider.getValue();if(this._bHSLMode){this.oAlphaField.setValue(this.Color.a);}if(!this.Color.formatHSL){this._processRGBChanges();}else{this._processChanges();}this._updateColorStringProperty(d==="change",d==="liveChange");};k.prototype._getValueInRange=function(v,M,i){if(isNaN(v)){v=0;}return Math.min(Math.max(v,M),i);};k.prototype._handleAlphaValueChange=function(){var d=parseFloat(this.oAlphaField.getValue(),10);d=this._getValueInRange(d,0,1);this.Color.a=d;this.oAlphaField.setValue(d);this.oAlphaSlider.setValue(d);if(!this.Color.formatHSL){this._processRGBChanges();}else{this._processChanges();}this._updateColorStringProperty(true,true);};k.prototype._handleRGBorHSLValueChange=function(){this.Color.formatHSL=(this.oRGBorHSLRBGroup.getSelectedIndex()===1);this._updateColorStringProperty(true,true);};k.prototype._handleHueValueChange=function(){var d=parseInt(this.oHueField.getValue(),10);d=this._getValueInRange(d,0,360);this.oHueField.setValue(d);this.oSlider.setValue(d);this._processChanges();this._updateColorStringProperty(true,true);};k.prototype._handleSatValueChange=function(){var d=parseInt(this.oSatField.getValue(),10);d=this._getValueInRange(d,0,100);this.oSatField.setValue(d);this._processChanges();this._updateColorStringProperty(true,true);};k.prototype._handleValValueChange=function(){var v=parseInt(this.oValField.getValue(),10);v=this._getValueInRange(v,0,100);this.oValField.setValue(v);this._processHSVChanges();this._updateColorStringProperty(true,true);};k.prototype._handleLitValueChange=function(){var d=parseInt(this.oLitField.getValue(),10);d=this._getValueInRange(d,0,100);this.oLitField.setValue(d);this._processHSLChanges();this._updateColorStringProperty(true,true);};k.prototype._handleRedValueChange=function(){var d=parseInt(this.oRedField.getValue(),10);d=this._getValueInRange(d,0,255);this.oRedField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};k.prototype._handleGreenValueChange=function(){var d=parseInt(this.oGreenField.getValue(),10);d=this._getValueInRange(d,0,255);this.oGreenField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};k.prototype._handleBlueValueChange=function(){var d=parseInt(this.oBlueField.getValue(),10);d=this._getValueInRange(d,0,255);this.oBlueField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};k.prototype._processHSVChanges=function(){var d=parseInt(this.oHueField.getValue(),10);var i=parseInt(this.oSatField.getValue(),10);var v=parseInt(this.oValField.getValue(),10);this._calculateRGB(d,i,v);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=d;this.Color.s=i;this.Color.v=v;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();};k.prototype._processHSLChanges=function(){var i=parseInt(this.oHueField.getValue(),10),S=parseInt(this.oSatField.getValue(),10),d=parseInt(this.oLitField.getValue(),10);if(i>360){i%=360;}this._calculateRGB(i,S,d);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=i;this.Color.s=S;this.Color.l=d;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oLitField.setValue(this.Color.l);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateAlphaBackground();this._updateSelColorBackground();};k.prototype._processRGBChanges=function(){var d=Math.round(parseInt(this.oRedField.getValue(),10)),i=Math.round(parseInt(this.oGreenField.getValue(),10)),n=Math.round(parseInt(this.oBlueField.getValue(),10)),p=(d+i+n)===765;this._calculateHEX(d,i,n);this.oHexField.setValue(this.sHexString);if(this._bHSLMode){this._calculateHSL(d,i,n);this.oLitField.setValue(this.Color.l);}else{if(!p){this._calculateHSV(d,i,n);}this.oValField.setValue(this.Color.v);}if(!p){this.oHueField.setValue(this.Color.h);}this.oSatField.setValue(this.Color.s);this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.Color.r=d;this.Color.g=i;this.Color.b=n;this.Color.hex="#"+this.oHexField.getValue();this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();};k.prototype._handleHexValueChange=function(){var d=this.oHexField.getValue().toLowerCase(),i=1,n;if(d.substr(0,1)==='#'){d=d.substr(1);}n=/^([0-9a-fA-F]{8})$/;if(n.test(d)!==false){i=Number((parseInt(d.substr(6,2),16)/255).toFixed(2));d=d.substr(0,6);}n=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(n.test(d)===false){this.oHexField.setValueState(h.Error);this.oSlider.setEnabled(false);this.oAlphaSlider.setEnabled(false);this.oHueField.setEnabled(false);this.oRedField.setEnabled(false);this.oGreenField.setEnabled(false);this.oBlueField.setEnabled(false);this.oSatField.setEnabled(false);if(this._bHSLMode){this.oLitField.setEnabled(false);this.oAlphaField.setEnabled(false);}else{this.oValField.setEnabled(false);}return;}else if(this.oHexField.getValueState()===h.Error){this.oHexField.setValueState(h.None);this.oSlider.setEnabled(true);this.oAlphaSlider.setEnabled(true);this.oHueField.setEnabled(true);this.oRedField.setEnabled(true);this.oGreenField.setEnabled(true);this.oBlueField.setEnabled(true);this.oSatField.setEnabled(true);if(this._bHSLMode){this.oLitField.setEnabled(true);this.oAlphaField.setEnabled(true);}else{this.oValField.setEnabled(true);}}if(d.length===3){d=d.charAt(0)+d.charAt(0)+d.charAt(1)+d.charAt(1)+d.charAt(2)+d.charAt(2);}this._processHexChanges(d);this.oHexField.setValue(d);this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(1);}else{this.oValField.setValue(this.Color.v);}this.oSlider.setValue(parseInt(this.oHueField.getValue(),10));this.oAlphaSlider.setValue(i);this.Color.a=i;if(this._bHSLMode){this.oAlphaField.setValue(i);}this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();this._updateColorStringProperty(true,true);};k.prototype._processHexChanges=function(d){this._convertRGB(d);if(this._bHSLMode){this._calculateHSL(this.Color.r,this.Color.g,this.Color.b);}else{this._calculateHSV(this.Color.r,this.Color.g,this.Color.b);}this.Color.hex="#"+d.toLowerCase();};k.prototype._updateAlphaBackground=function(){var d=[this.Color.r,this.Color.g,this.Color.b].join(","),n=B+"(left,rgba("+d+",0),rgba("+d+",1)),url("+s+")";if(this.lastAlphaSliderGradient!==n){this.oAlphaSlider.$().find(this.bResponsive?".sapMSliderInner":".sapUiSliBar").css("background-image",n);this.lastAlphaSliderGradient=n;}};k.prototype._updateCursorPosition=function(){var x,y;if(!this._iCPBoxSize){return;}if(this._bHSLMode){x=Math.round(this.oLitField.getValue()*this._iCPBoxSize/100.0);}else{x=Math.round(this.oValField.getValue()*this._iCPBoxSize/100.0);}if(this.bRtl){x=this._iCPBoxSize-x;}y=Math.round((1-this.oSatField.getValue()/100.0)*this._iCPBoxSize);x=Math.round(Math.max(x,0)-this._iCPCursorSize/2.0-1.0);y=Math.round(Math.max(y,0)-this._iCPCursorSize/2.0-1.0);this.$CPCur.css("left",x).css("top",y);};k.prototype._calculateRGB=function(d,S,v){var n,p,t,M,x,C,i;if(this._bHSLMode){this._calculateRGBAdvanced(d,S,v);return;}d%=360;d/=60;S/=100;v/=100;C=v*S;x=C*(1-Math.abs(d%2-1));M=v-C;n=0;p=0;t=0;i=Math.floor(d);switch(i){case 0:n=C;p=x;break;case 1:n=x;p=C;break;case 2:p=C;t=x;break;case 3:p=x;t=C;break;case 4:n=x;t=C;break;case 5:n=C;t=x;break;default:n=0;t=0;p=0;break;}this.RGB.r=Math.floor((n+M)*255);this.RGB.g=Math.floor((p+M)*255);this.RGB.b=Math.floor((t+M)*255);};k.prototype._calculateRGBAdvanced=function(d,S,n){var p,t,u,M,v,x,w,y,i;d=this._getValueInRange(d,0,360);if(S>100){S=1;}else if(S<0){S=0;}else{S=S/100;}if(n>100){n=1;}else if(n<0){n=0;}else{n=n/100;}y=S*(1-Math.abs(2*n-1));w=255*(n-0.5*y);x=y*(1-Math.abs((d/60)%2-1));i=Math.floor(d/60);v=w+255*x;M=w+255*y;switch(i){case 0:p=M;t=v;u=w;break;case 1:p=v;t=M;u=w;break;case 2:p=w;t=M;u=v;break;case 3:p=w;t=v;u=M;break;case 4:p=v;t=w;u=M;break;case 5:p=M;t=w;u=v;break;default:p=0;t=0;u=0;break;}this.RGB.r=Math.round(p);this.RGB.g=Math.round(t);this.RGB.b=Math.round(u);};k.prototype._getCSSColorString=function(){if(this.Color.formatHSL){if(this.Color.a<1){return"hsla("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%, "+this.Color.a+")";}else{return"hsl("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%)";}}if(this.Color.a<1){return"rgba("+this.Color.r+","+this.Color.g+","+this.Color.b+", "+this.Color.a+")";}else{return"rgb("+this.Color.r+","+this.Color.g+","+this.Color.b+")";}};k.prototype._calculateHEX=function(i,d,n){var p=i.toString(16),t=d.toString(16),u=n.toString(16);if(p.length===1){p='0'+p;}if(t.length===1){t='0'+t;}if(u.length===1){u='0'+u;}this.sHexString=(p+t+u).toLowerCase();};k.prototype._calculateHSV=function(i,d,n){var p=Math.max(Math.max(i,d),n),t=Math.min(Math.min(i,d),n),u=p-t,v=Math.round(p*100/255),w=p===0.0?0:(100*u/p),x=0;if(w===0){x=0;}else if(i===p){x=60.0*(d-n)/u;}else if(d===p){x=120.0+60.0*(n-i)/u;}else if(n===p){x=240.0+60.0*(i-d)/u;}if(x<0.0){x+=359.9;}x=Math.round(x);w=Math.round(w);this.Color.h=x;this.Color.s=w;this.Color.v=v;};k.prototype._calculateHSL=function(i,n,p){var t=Math.max(i,n,p),u=Math.min(i,n,p),d=(t-u)/255,v=(t+u)/510,w=1-Math.abs(2*v-1),x=(v===0.0)?0:d/w,y=(w!==0)?x:0,z=0;v=Math.round(v*100);y=Math.round(y*100);if(v===0||y===0||(i+n+p===765)){z=0;}else{var C=t-u;if(t===i){z=((n-p)/C)%6;}if(t===n){z=(p-i)/C+2;}if(t===p){z=(i-n)/C+4;}if(C===0){z=0;}z*=60;if(z<0){z+=360;}}this.Color.h=Math.round(z);this.Color.s=y;this.Color.l=v;};k.prototype._convertRGB=function(d){this.Color.r=parseInt(d.substr(0,2),16);this.Color.g=parseInt(d.substr(2,2),16);this.Color.b=parseInt(d.substr(4,2),16);};k.prototype._updateGradientBoxBackground=function(i){if(this._bHSLMode){this._calculateRGBAdvanced(i,100,50);}else{this._calculateRGB(i,100,100);}this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.$CPBox.css('background-color','rgb('+[this.RGB.r,this.RGB.g,this.RGB.b].join(",")+')');};k.prototype._updateSelColorBackground=function(){this.$("ncBox").css('background-color',this._getCSSColorString());};k.prototype._parseColorString=function(C,d){var i;if(C.substr(0,1)==='#'){C=C.substr(1);}C=C.trim().toLowerCase();i=this._parseColorName(C);if(i){if(d){return true;}if(i.length===8){this.Color.a=this.Color.oldA=Number((parseInt(i.substr(6,2),16)/255).toFixed(2));i=i.substring(0,6);}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false;}return true;}if(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(C)){if(d){return true;}if(C.length===3){i=C[0]+C[0]+C[1]+C[1]+C[2]+C[2];}else{i=C;}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false;}return true;}if(C.substr(0,3)==='rgb'){return this._parseRGB(C,d);}if(this._bHSLMode){return this._parseHSL(C,d);}else if(C.substr(0,3)==='hsv'){return this._parseHSV(C,d);}return false;};k.prototype._parseHSV=function(C,d){var i=/^(((\d{1,2})|([1,2]\d{2})|(3[0-5]\d)|(360)),)(((\d{1,2})|(100)),)((\d{1,2})|(100))$/,n,p,S,v;C=C.substr(3).replace("(",'').replace(")",'').split(' ').join('');if(i.test(C)===true){if(d){return true;}n=C.split(",");p=parseInt(n[0],10);S=parseInt(n[1],10);v=parseInt(n[2],10);this._calculateRGB(p,S,v);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=p;this.Color.s=S;this.Color.v=v;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;return true;}return false;};k.prototype._parseHSL=function(C,d){var i,n=C.substr(0,4),p,t,S,u,A;if(n==="hsla"){p=true;}else if(n==="hsl("){p=false;}else{return false;}C=C.substr(p?4:3).replace("(",'').replace(")",'').split(' ').join('');i=C.split(",");t=parseInt(i[0],10);S=parseFloat(i[1]);u=parseFloat(i[2]);if(p){A=parseFloat(i[3]);}else{if(i[3]&&parseFloat(i[3])>=0){return false;}A=1;}S=(S<1&&S>0)?S*100:S;u=(u<1&&u>0)?u*100:u;if((t>=0&&t<=360)&&(S>=0&&S<=100)&&(u>=0&&u<=100)&&(A>=0&&A<=1)){if(d){return true;}this._calculateRGB(t,S,u);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=t;this.Color.s=S;this.Color.l=u;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;this.Color.a=this.Color.oldA=A;this.Color.formatHSL=true;}else{return false;}return true;};k.prototype._parseRGB=function(C,d){var v,i,n,p;i=C.substring(0,4);if(i==="rgba"){p=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),)([0]|([0]\.[0-9]+)|(\.[0-9]+)|[1])$/;n=true;}else if(i.substring(0,3)==="rgb"){p=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;n=false;}else{return false;}C=C.substr(n?4:3).replace("(",'').replace(")",'').split(' ').join('');if(p.test(C)){if(d){return true;}v=C.split(",");this._calculateHEX(parseInt(v[0],10),parseInt(v[1],10),parseInt(v[2],10));this._processHexChanges(this.sHexString);this.Color.old=this.Color.hex;if(n){this.Color.a=this.Color.oldA=parseFloat(v[3]);}return true;}if(this._bHSLMode){this.Color.formatHSL=false;}return false;};k.prototype._parseColorName=function(C){return l.Colors[C];};k.prototype.onAfterRendering=function(){var d=this._getCSSColorString();this.$CPBox=this.oCPBox.$();this.$CPCur=this.oCPBox.getHandle();this.$("ncBox").css('background-color',d);this.$("ocBox").css('background-color',d);this._updateGradientBoxBackground(this.Color.h);this._iCPBoxSize=this.oCPBox.getWidth();this._updateCursorPosition();if(this._bHSLMode){this._updateAlphaBackground();}this.oSlider.iShiftGrip=Math.round(q(this.oSlider.oGrip).outerWidth()/2);this.oAlphaSlider.iShiftGrip=Math.round(q(this.oAlphaSlider.oGrip).outerWidth()/2);};k.prototype.getRGB=function(){return{r:this.Color.r,g:this.Color.g,b:this.Color.b};};k.prototype._getConstants=function(){return l;};return k;});