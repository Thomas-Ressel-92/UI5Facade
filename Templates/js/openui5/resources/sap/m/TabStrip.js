/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/delegate/ItemNavigation','sap/ui/base/ManagedObject','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/InvisibleText','./AccButton','./TabStripItem','sap/m/Select','sap/m/SelectList','sap/ui/Device','sap/ui/core/Renderer','sap/ui/core/ResizeHandler','sap/m/library','sap/ui/core/Icon'],function(q,C,I,a,M,S,b,A,T,c,d,D,R,e,l,f){"use strict";var g=l.SelectType;var B=l.ButtonType;var h=C.extend("sap.m.TabStrip",{metadata:{library:"sap.m",properties:{hasSelect:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabStripItem",multiple:true,singularName:"item"},addButton:{type:"sap.m.Button",multiple:false,singularName:"addButton"},_select:{type:'sap.m.Select',multiple:false,visibility:"hidden"},_rightArrowButton:{type:'sap.m.AccButton',multiple:false,visibility:"hidden"},_leftArrowButton:{type:'sap.m.AccButton',multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:'sap.m.TabStripItem',group:"Misc"}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabStripItem"}}},itemPress:{parameters:{item:{type:"sap.m.TabStripItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}}}},constructor:function(v,s){var H=false;if(!s&&typeof v==='object'){s=v;}if(s){H=s['hasSelect'];delete s['hasSelect'];}M.prototype.constructor.apply(this,arguments);this.setProperty('hasSelect',H,true);}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");h.ICON_BUTTONS={LeftArrowButton:"slim-arrow-left",RightArrowButton:"slim-arrow-right",DownArrowButton:"slim-arrow-down",AddButton:"add"};h.SELECT_ITEMS_ID_SUFFIX='-SelectItem';h.SCROLL_SIZE=320;h.MIN_DRAG_OFFSET=D.support.touch?15:5;h.SCROLL_ANIMATION_DURATION=sap.ui.getCore().getConfiguration().getAnimation()?500:0;h.ARIA_STATIC_TEXTS={closable:new b({text:r.getText("TABSTRIP_ITEM_CLOSABLE")}).toStatic(),modified:new b({text:r.getText("TABSTRIP_ITEM_MODIFIED")}).toStatic(),notModified:new b({text:r.getText("TABSTRIP_ITEM_NOT_MODIFIED")}).toStatic()};h.prototype.init=function(){this._bDoScroll=!D.system.phone;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(!D.system.phone){this._oScroller=new S(this,this.getId()+"-tabs",{horizontal:true,vertical:false,nonTouchScrolling:true});}};h.prototype.exit=function(){this._bRtl=null;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._sResizeListenerId){e.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this._removeItemNavigation();};h.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){e.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};h.prototype.onAfterRendering=function(){if(this._oScroller){this._oScroller.setIconTabBar(this,q.proxy(this._handleOverflowButtons,this),null);}this._addItemNavigation();if(!D.system.phone){this._adjustScrolling();this._sResizeListenerId=e.register(this.getDomRef(),q.proxy(this._adjustScrolling,this));}};h.prototype.getFocusDomRef=function(){var t=sap.ui.getCore().byId(this.getSelectedItem());if(!t){return null;}return t.getDomRef();};h.prototype.applyFocusInfo=function(F){if(F.focusDomRef){q(F.focusDomRef).focus();}};h.prototype._addItemNavigation=function(){var H=this.getDomRef("tabsContainer"),n=this.getItems(),t=[];n.forEach(function(o){var p=o.getDomRef();q(p).attr("tabindex","-1");t.push(p);});if(!this._oItemNavigation){this._oItemNavigation=new a();}this._oItemNavigation.setRootDomRef(H);this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setCycling(false);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this.addDelegate(this._oItemNavigation);};h.prototype._checkScrolling=function(){var t=this.getDomRef("tabs"),s=t&&(t.scrollWidth>this.getDomRef("tabsContainer").offsetWidth);this.$().toggleClass("sapMTSScrollable",s);return s;};h.prototype._handleOverflowButtons=function(){var t=this.getDomRef("tabs"),o=this.getDomRef("tabsContainer"),s,n,p,u=false,v=false,w=this._checkScrolling();if(w&&!this.getAggregation("_rightArrowButton")&&!this.getAggregation("_leftArrowButton")){this._getLeftArrowButton();this._getRightArrowButton();var x=sap.ui.getCore().createRenderManager();this.getRenderer().renderRightOverflowButtons(x,this,true);this.getRenderer().renderLeftOverflowButtons(x,this,true);x.destroy();}if(w&&t&&o){if(this._bRtl&&D.browser.firefox){s=-o.scrollLeft;}else{s=o.scrollLeft;}n=t.scrollWidth;p=o.clientWidth;if(Math.abs(n-p)===1){n=p;}if(s>0){if(this._bRtl&&D.browser.webkit){v=true;}else{u=true;}}if((n>p)&&(s+p<n)){if(this._bRtl&&D.browser.webkit){u=true;}else{v=true;}}this.$().toggleClass("sapMTSScrollBack",u).toggleClass("sapMTSScrollForward",v);}else{this.$().toggleClass("sapMTSScrollBack",false).toggleClass("sapMTSScrollForward",false);}};h.prototype._adjustScrolling=function(){this._iMaxOffsetLeft=Math.abs(this.$("tabsContainer").width()-this.$("tabs").width());this._handleOverflowButtons();};h.prototype._getLeftArrowButton=function(){return this._getArrowButton("_leftArrowButton",r.getText("TABSTRIP_SCROLL_BACK"),h.ICON_BUTTONS.LeftArrowButton,-h.SCROLL_SIZE);};h.prototype._getRightArrowButton=function(){return this._getArrowButton("_rightArrowButton",r.getText("TABSTRIP_SCROLL_FORWARD"),h.ICON_BUTTONS.RightArrowButton,h.SCROLL_SIZE);};h.prototype._getArrowButton=function(s,t,n,o){var p=this.getAggregation(s),u=this;if(!p){p=new A({type:B.Transparent,icon:I.getIconURI(n),tooltip:t,tabIndex:"-1",ariaHidden:"true",press:function(E){u._scroll(o,h.SCROLL_ANIMATION_DURATION);}});this.setAggregation(s,p,true);}return p;};h.prototype._removeItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};h.prototype._scroll=function(n,o){var s=this.getDomRef("tabsContainer").scrollLeft,p=D.browser.internet_explorer||D.browser.edge,t;if(this._bRtl&&!p){t=s-n;if(D.browser.firefox){if(t<-this._iMaxOffsetLeft){t=-this._iMaxOffsetLeft;}if(t>0){t=0;}}}else{t=s+n;if(t<0){t=0;}if(t>this._iMaxOffsetLeft){t=this._iMaxOffsetLeft;}}this._oScroller.scrollTo(t,0,o);this._iCurrentScrollLeft=t;};h.prototype._scrollIntoView=function(o,n){var $=this.$("tabs"),p=o.$(),t=$.innerWidth()-$.width(),s=p.outerWidth(true),u=p.position().left-t/2,v=this.getDomRef("tabsContainer"),w=v.scrollLeft,x=this.$("tabsContainer").width(),N=w;if(u<0||u>x-s){if(this._bRtl&&D.browser.firefox){if(u<0){N+=u+s-x;}else{N+=u;}}else{if(u<0){N+=u;}else{N+=u+s-x;}}this._iCurrentScrollLeft=N;this._oScroller.scrollTo(N,0,n);}};h.prototype._createSelect=function(t){var s,o,n,p={type:D.system.phone?g.Default:g.IconOnly,autoAdjustWidth:true,maxWidth:D.system.phone?"100%":"2.5rem",icon:I.getIconURI(h.ICON_BUTTONS.DownArrowButton),tooltip:r.getText("TABSTRIP_OPENED_TABS"),change:function(E){o=E.getParameters()['selectedItem'];n=this._findTabStripItemFromSelectItem(o);this._activateItem(n,E);}.bind(this)};s=new j(p).addStyleClass("sapMTSOverflowSelect");this._addItemsToSelect(s,t);return s;};h.prototype.onsapselect=function(E){E.setMarked();E.preventDefault();this._activateItem(E.srcControl,E);};h.prototype.onsapdelete=function(E){var o=q("#"+E.target.id).control(0),s=o.getId()===this.getSelectedItem(),n=function(){this._moveToNextItem(s);};this._removeItem(o,n);};h.prototype._moveToNextItem=function(s){if(!this._oItemNavigation){return;}var n=this.getItems().length,o=this._oItemNavigation.getFocusedIndex(),N=n===o?--o:o,p=this.getItems()[N],F=function(){if(this._oItemNavigation){this._oItemNavigation.focusItem(N);}};if(s){this.setSelectedItem(p);this.fireItemPress({item:p});}q.sap.delayedCall(0,this,F);};h.prototype._activateItem=function(o,E){if(this.fireItemSelect({item:o})){if(o&&o instanceof T){if(!this.getSelectedItem()||this.getSelectedItem()!==o.getId()){this.setSelectedItem(o);}this.fireItemPress({item:o});}}else if(E&&!E.isDefaultPrevented()){E.preventDefault();}};h.prototype.addAggregation=function(s,o,n){if(s==='items'){this._handleItemsAggregation(['addAggregation',o,n],true);}return C.prototype.addAggregation.call(this,s,o,n);};h.prototype.insertAggregation=function(s,o,n,p){if(s==='items'){this._handleItemsAggregation(['insertAggregation',o,n,p],true);}return C.prototype.insertAggregation.call(this,s,o,n,p);};h.prototype.removeAggregation=function(s,o,n){if(s==='items'){this._handleItemsAggregation(['removeAggregation',o,n]);}return C.prototype.removeAggregation.call(this,s,o,n);};h.prototype.removeAllAggregation=function(s,n){if(s==='items'){this._handleItemsAggregation(['removeAllAggregation',null,n]);}return C.prototype.removeAllAggregation.call(this,s,n);};h.prototype.destroyAggregation=function(s,n){if(s==='items'){this._handleItemsAggregation(['destroyAggregation',n]);}return C.prototype.destroyAggregation.call(this,s,n);};h.prototype.setSelectedItem=function(s){if(!s){return;}if(s.$().length>0){this._scrollIntoView(s,500);}this._updateAriaSelectedAttributes(this.getItems(),s);this._updateSelectedItemClasses(s.getId());if(this.getHasSelect()){var o=this._findSelectItemFromTabStripItem(s);this.getAggregation('_select').setSelectedItem(o);}return h.prototype.setAssociation.call(this,"selectedItem",s,true);};h.prototype.setProperty=function(p,v,s){var n;n=C.prototype.setProperty.call(this,p,v,s);if(p==='hasSelect'){if(v){if(!this.getAggregation('_select')){n=this.setAggregation('_select',this._createSelect(this.getItems()));}}else{n=this.destroyAggregation('_select');}}return n;};h.prototype._attachItemEventListeners=function(o){if(o instanceof T){var E=['itemClosePressed','itemPropertyChanged'];E.forEach(function(s){s=s.charAt(0).toUpperCase()+s.slice(1);o['detach'+s](this['_handle'+s]);o['attach'+s](this['_handle'+s].bind(this));},this);}};h.prototype._detachItemEventListeners=function(o){if(!o||typeof o!=='object'||!(o instanceof T)){var n=this.getItems();n.forEach(function(p){if(typeof p!=='object'||!(p instanceof T)){return;}return this._detachItemEventListeners(p);}.bind(this));}};h.prototype._handleItemPropertyChanged=function(E){var s=this._findSelectItemFromTabStripItem(E.getSource());s.setProperty(E['mParameters'].propertyKey,E['mParameters'].propertyValue);};h.prototype._handleItemClosePressed=function(E){this._removeItem(E.getSource());};h.prototype._removeItem=function(o,n){var t;if(!(o instanceof T)){q.sap.log.error('Expecting instance of a TabStripSelectItem, given: ',o);}if(o.getId().indexOf(h.SELECT_ITEMS_ID_SUFFIX)!==-1){t=this._findTabStripItemFromSelectItem(o);}else{t=o;}if(this.fireItemClose({item:t})){this.removeAggregation('items',t);this._moveToNextItem(o.getId()===this.getSelectedItem());if(n){n.call(this);}}};h.prototype._handleItemsAggregation=function(n,o){var s='items',F=n[0],O=n[1],N=[s];n.forEach(function(p,t){if(t>0){N.push(p);}});if(o){this._attachItemEventListeners(O);}else{this._detachItemEventListeners(O);}if(s!=="items"){return this;}if(this.getHasSelect()){this._handleSelectItemsAggregation(N,o,F,O);}return this;};h.prototype._handleSelectItemsAggregation=function(n,o,F,O){var s=this.getAggregation('_select'),p;if(F==='destroyAggregation'&&!s){return;}if(O===null||typeof O!=='object'){return s[F]['apply'](s,n);}if(o){p=this._createSelectItemFromTabStripItem(O);}else{p=this._findSelectItemFromTabStripItem(O);}n.forEach(function(t,u){if(typeof t==='object'){n[u]=p;}});return s[F]['apply'](s,n);};h.prototype._addItemsToSelect=function(s,n){n.forEach(function(o){var p=this._createSelectItemFromTabStripItem(o);s.addAggregation('items',p);if(o.getId()===this.getSelectedItem()){s.setSelectedItem(p);}},this);};h.prototype._createSelectItemFromTabStripItem=function(t){var s;if(!t&&!(t instanceof sap.m.TabContainerItem)){q.sap.log.error('Expecting instance of "sap.m.TabContainerItem": instead of '+t+' given.');return;}s=new T({id:t.getId()+h.SELECT_ITEMS_ID_SUFFIX,text:t.getText(),modified:t.getModified(),itemClosePressed:function(E){this._handleItemClosePressed(E);}.bind(this)});s.addEventDelegate({ontap:function(E){var o=E.srcControl;if((o instanceof A||o instanceof f)){this.fireItemClosePressed({item:this});}}},s);return s;};h.prototype._findTabStripItemFromSelectItem=function(t){var n,s=t.getId().replace(h.SELECT_ITEMS_ID_SUFFIX,''),o=this.getItems();for(n=0;n<o.length;n++){if(o[n].getId()===s){return o[n];}}};h.prototype._findSelectItemFromTabStripItem=function(t){var n,s,o=t.getId()+h.SELECT_ITEMS_ID_SUFFIX;if(this.getHasSelect()){s=this.getAggregation('_select').getItems();for(n=0;n<s.length;n++){if(s[n].getId()===o){return s[n];}}}};h.prototype._updateAriaSelectedAttributes=function(n,s){var o="false";n.forEach(function(p){if(p.$()){if(s&&s.getId()===p.getId()){o="true";}p.$().attr("aria-selected",o);}});};h.prototype._updateSelectedItemClasses=function(s){if(this.$("tabs")){this.$("tabs").children(".sapMTabStripItemSelected").removeClass("sapMTabStripItemSelected");q("#"+s).addClass("sapMTabStripItemSelected");}};h.prototype.changeItemState=function(v,s){var $;var n=this.getItems();n.forEach(function(o){if(v===o.getId()){$=q(o.$());if(s===true&&!$.hasClass(T.CSS_CLASS_MODIFIED)){$.addClass(T.CSS_CLASS_MODIFIED);}else{$.removeClass(T.CSS_CLASS_MODIFIED);}}});};h.prototype.ontouchstart=function(E){var t=q(E.target).control(0);if(t instanceof T||t instanceof A||t instanceof f||t instanceof j){this._oTouchStartX=E.changedTouches[0].pageX;}};h.prototype.ontouchend=function(E){var t,n;if(!this._oTouchStartX){return;}t=q(E.target).control(0);n=Math.abs(E.changedTouches[0].pageX-this._oTouchStartX);if(n<h.MIN_DRAG_OFFSET){if(t instanceof T){this._activateItem(t,E);}else if(t instanceof A){if(t&&t.getParent&&t.getParent()instanceof T){t=t.getParent();this._removeItem(t);}}else if(t instanceof f){if(t&&t.getParent&&t.getParent().getParent&&t.getParent().getParent()instanceof T){t=t.getParent().getParent();this._removeItem(t);}}this._oTouchStartX=null;}};h.prototype.destroyItems=function(){this.setAssociation("selectedItem",null);return this.destroyAggregation("items");};var i=R.extend(sap.m.SelectRenderer);var j=c.extend("CustomSelect",{renderer:i});j.prototype.onAfterRendering=function(){c.prototype.onAfterRendering.apply(this,arguments);this.$().attr("tabindex","-1");};j.prototype.onAfterRenderingPicker=function(){var p=this.getPicker();c.prototype.onAfterRenderingPicker.call(this);if(D.system.phone){return;}p.setOffsetX(Math.round(sap.ui.getCore().getConfiguration().getRTL()?this.getPicker().$().width()-this.$().width():this.$().width()-this.getPicker().$().width()));p.setOffsetY(this.$().parents().hasClass('sapUiSizeCompact')?2:3);p._calcPlacement();};j.prototype.createList=function(){this._oList=new m({width:"100%"}).attachSelectionChange(this.onSelectionChange,this).addEventDelegate({ontap:function(E){this.close();}},this);return this._oList;};j.prototype.setValue=function(v){c.prototype.setValue.apply(this,arguments);this.$("label").toggleClass("sapMTSOverflowSelectLabelModified",this.getSelectedItem()&&this.getSelectedItem().getProperty("modified"));return this;};var k=R.extend(sap.m.SelectListRenderer);k.renderItem=function(o,L,n,s){o.write("<li");o.writeElementData(n);o.addClass(sap.m.SelectListRenderer.CSS_CLASS+"ItemBase");o.addClass(sap.m.SelectListRenderer.CSS_CLASS+"Item");o.addClass("sapMTSOverflowSelectListItem");if(n.getProperty("modified")){o.addClass("sapMTSOverflowSelectListItemModified");}if(D.system.desktop){o.addClass(sap.m.SelectListRenderer.CSS_CLASS+"ItemBaseHoverable");}if(n===L.getSelectedItem()){o.addClass(sap.m.SelectListRenderer.CSS_CLASS+"ItemBaseSelected");}o.writeClasses();this.writeItemAccessibilityState.apply(this,arguments);o.write(">");o.write('<p class=\"sapMSelectListItemText\">');o.writeEscaped(n.getText().slice(0,(D.system.phone?n.getText().length:T.DISPLAY_TEXT_MAX_LENGTH)));if(!D.system.phone&&n.getText().length>T.DISPLAY_TEXT_MAX_LENGTH){o.write('...');}o.write('</p>');o.renderControl(n.getAggregation('_closeButton'));o.write("</li>");};var m=d.extend("CustomSelectList",{renderer:k});return h;});