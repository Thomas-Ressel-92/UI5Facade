/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/CompatibilityConnector","sap/ui/fl/Utils","sap/base/util/UriParameters","sap/base/Log"],function(C,U,a,L){"use strict";var S=function(s){if(!s){throw new Error("no flex settings provided");}if(!s.defaultLayerPermissions){s.defaultLayerPermissions={VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:true,USER:false};}if(!s.developerModeLayerPermissions){s.developerModeLayerPermissions={VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:false,USER:false};}if(!(S._IS_VARIANT_SHARING_ENABLED in s)){s.isVariantSharingEnabled=true;}this._oSettings=s;};S._IS_VARIANT_SHARING_ENABLED="isVariantSharingEnabled";S.attachEvent=function(e,c){S._oEventProvider.attachEvent(e,c);};S.detachEvent=function(e,c){S._oEventProvider.detachEvent(e,c);};S.getInstance=function(){if(S._instance){return Promise.resolve(S._instance);}if(S._oLoadSettingsPromise){return S._oLoadSettingsPromise;}return S._loadSettings();};S._loadSettings=function(){var l=C.loadSettings().then(function(s){if(!s){L.error("The request for flexibility settings failed; A default response is generated and returned to consuming APIs");s={isKeyUser:false,isVariantSharingEnabled:false,isAtoAvailable:false,isAtoEnabled:false,isProductiveSystem:true,_bFlexChangeMode:false,_bFlexibilityAdaptationButtonAllowed:false};}return S._storeInstance(s);});S._oLoadSettingsPromise=l;return l;};S._storeInstance=function(s){if(!S._instance){S._instance=new S(s);}return S._instance;};S.getInstanceOrUndef=function(){var s;if(S._instance){s=S._instance;}return s;};S.prototype._getBooleanProperty=function(p){var v=false;if(this._oSettings[p]){v=this._oSettings[p];}return v;};S.prototype.isKeyUser=function(){return this._getBooleanProperty("isKeyUser");};S.prototype.isModelS=function(){return this._getBooleanProperty("isAtoAvailable");};S.prototype.isAtoEnabled=function(){return this._getBooleanProperty("isAtoEnabled");};S.prototype.isAtoAvailable=function(){return this._getBooleanProperty("isAtoAvailable");};S.prototype.isProductiveSystem=function(){return this._getBooleanProperty("isProductiveSystem");};S.prototype.isVariantSharingEnabled=function(){return(this._oSettings.isVariantSharingEnabled===true);};S.prototype.getSystem=function(){return this._oSettings.system;};S.prototype.getClient=function(){return this._oSettings.client;};S.prototype.getDefaultLayerPermissions=function(){return this._oSettings.defaultLayerPermissions;};S.prototype.getDeveloperModeLayerPermissions=function(){return this._oSettings.developerModeLayerPermissions;};return S;},true);
