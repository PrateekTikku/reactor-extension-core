'use strict';

var getDataElementValue = require('@turbine/get-data-element-value');
var compareNumbers = require('./helpers/compareNumbers');

/**
 * Cart item quantity condition. Determines if the current cart item quantity matches constraints.
 * @param {Object} settings Condition settings.
 * @param {number} settings.dataElement The name of the data element identifying
 * the cart item quantity to compare against.
 * @param {comparisonOperator} settings.operator The comparison operator to use
 * to compare the actual cart item quantity to the cart item quantity constraint.
 * @param {Number} settings.quantity The car item quantity constraint.
 * @returns {boolean}
 */
module.exports = function(settings) {
  var quantity = Number(getDataElementValue(settings.dataElement));

  if (isNaN(quantity)) {
    quantity = 0;
  }

  return compareNumbers(
    quantity,
    settings.operator,
    settings.quantity);
};

