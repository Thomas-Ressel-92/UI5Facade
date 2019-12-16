/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/RegistrationDelegator","sap/ui/fl/Utils","sap/ui/core/library","sap/m/library"],function(R,U){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.fl",version:"1.73.1",controls:["sap.ui.fl.variants.VariantManagement","sap.ui.fl.util.IFrame"],dependencies:["sap.ui.core","sap.m"],designtime:"sap/ui/fl/designtime/library.designtime",extensions:{"sap.ui.support":{diagnosticPlugins:["sap/ui/fl/support/Flexibility"],publicRules:true}}});sap.ui.fl.Scenario={AppVariant:"APP_VARIANT",VersionedAppVariant:"VERSIONED_APP_VARIANT",AdaptationProject:"ADAPTATION_PROJECT",FioriElementsFromScratch:"FE_FROM_SCRATCH",UiAdaptation:"UI_ADAPTATION"};R.registerAll();function _(){var u=U.getUshellContainer();if(u){return u.getLogonSystem().isTrial();}return false;}if(_()){sap.ui.getCore().getConfiguration().setFlexibilityServices([{connector:"LrepConnector",url:"/sap/bc/lrep",layers:[]},{connector:"LocalStorageConnector",layers:["CUSTOMER","USER"]}]);}return sap.ui.fl;});
