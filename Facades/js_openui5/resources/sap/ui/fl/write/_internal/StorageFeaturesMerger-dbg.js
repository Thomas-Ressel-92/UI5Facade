/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
], function (
) {
	"use strict";

	/**
	 * ConnectorFeaturesMerger class for Connector implementations (write).
	 *
	 * @namespace sap.ui.fl.write._internal.StorageFeaturesMerger
	 * @since 1.70
	 * @version 1.73.1
	 * @private
	 * @ui5-restricted sap.ui.fl.write._internal.Storage
	 */

	var DEFAULT_FEATURES = {
		isKeyUser: false,
		isVariantSharingEnabled: false,
		isAtoAvailable: false,
		isAtoEnabled: false,
		isProductiveSystem: true,
		isZeroDowntimeUpgradeRunning: false,
		system: "",
		client: ""
	};

	return {
		/**
		 * Merges the results from all involved connectors otherwise take default value.
		 *
		 * @param {object[]} aResponses All responses provided by the different connectors
		 * @returns {object} Merged result
		 */
		mergeResults: function(aResponses) {
			var oResult = DEFAULT_FEATURES;
			aResponses.forEach(function (oResponse) {
				if (oResponse.response) {
					Object.keys(oResponse.response).forEach(function (sKey) {
						oResult[sKey] = oResponse.response[sKey];
					});
				}
			});
			return oResult;
		}
	};
});
