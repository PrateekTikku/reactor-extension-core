'use strict';

var poll = require('poll');
var dataStash = require('createDataStash')('elementExists');
var extension = require('getExtension')('dtm');
var matchesProperties = extension.getResource('matchesProperties');

var listenersBySelector = {};

poll('element exists event delegate', function() {
  Object.keys(listenersBySelector).forEach(function(selector) {
    var listeners = listenersBySelector[selector];
    var elements = document.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var elementDataStash = dataStash(element);

      if (!elementDataStash.seen) {
        elementDataStash.seen = true;

        for (var k = 0; k < listeners.length; k++) {
          var listener = listeners[k];
          if (matchesProperties(element, listener.settings.elementProperties)) {
            listener.trigger({
              type: 'elementexists',
              target: element
            }, element);
            listeners.splice(k, 1);
            k--;
          }
        }
      }

      // Listeners are removed from the array as their respective rules are fired.
      // Once we have no more rules corresponding to the selector there is no need to
      // continue scanning elements with the selector.
      if (!listeners.length) {
        delete listenersBySelector[selector];
        break;
      }
    }
  });
});

/**
 * Element exists event. This event occurs when an element has been added to the DOM. The rule
 * should run no more than once.
 * @param {Object} settings The event settings object.
 * @param {string} settings.elementSelector The CSS selector the element must match in order for
 * the rule to fire.
 * @param {Object[]} [settings.elementProperties] Property values the element must have in order
 * for the rule to fire.
 * @param {string} settings.elementProperties[].name The property name.
 * @param {string} settings.elementProperties[].value The property value.
 * @param {boolean} [settings.elementProperties[].valueIsRegex=false] Whether <code>value</code>
 * on the object instance is intended to be a regular expression.
 * @param {ruleTrigger} trigger The trigger callback.
 */
module.exports = function(settings, trigger) {
  var listeners = listenersBySelector[settings.elementSelector];

  if (!listeners) {
    listeners = listenersBySelector[settings.elementSelector] = [];
  }

  listeners.push({
    settings: settings,
    trigger: trigger
  });
};
