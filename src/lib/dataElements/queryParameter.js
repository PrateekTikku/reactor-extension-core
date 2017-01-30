/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2016 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property
* laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

'use strict';

var getQueryParam = require('@turbine/get-query-param');

/**
 * The query parameter data element.
 * @param {Object} settings The data element settings object.
 * @param {string} settings.name The query parameter name.
 * @param {string} [settings.caseInsensitive] Whether casing should be ignored.
 * @returns {string}
 */
module.exports = function(settings) {
  return getQueryParam(settings.name, settings.caseInsensitive || false);
};
