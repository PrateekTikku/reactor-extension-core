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

describe('onload event type', function() {
  it('triggers rule when the load event occurs', function() {
    var delegate = require('../onLoad');

    var trigger = jasmine.createSpy();

    delegate({}, trigger);

    expect(trigger.calls.count()).toBe(0);

    Simulate.event(window, 'load');

    expect(trigger.calls.count()).toBe(1);
    var call = trigger.calls.mostRecent();
    expect(call.args[0]).toBe(document.location);
    expect(call.args[1].type).toBe('windowload');
    expect(call.args[1].target).toBe(document.location);
  });
});
