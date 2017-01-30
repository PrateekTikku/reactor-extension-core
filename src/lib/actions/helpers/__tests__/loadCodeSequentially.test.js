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

var sequentiallyLoadCodePromiseInjector = require('inject!../loadCodeSequentially');
var Promise = require('@adobe/composer-turbine/lib/require')('@turbine/promise');

var sequentiallyLoadCodePromise = sequentiallyLoadCodePromiseInjector({
  './getSourceByUrl': function(sourceUrl) {
    if (sourceUrl === 'url1') {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve('url1 source code');
        }, 0);
      });
    } else {
      return Promise.resolve('url2 source code');
    }
  }
});

describe('load code sequentially', function() {
  it('does the correct loaded order', function(done) {
    var loadedCode = [];

    var action1 = sequentiallyLoadCodePromise('url1').then(function(code) {
      loadedCode.push(code);
    });

    var action2 = sequentiallyLoadCodePromise('url2').then(function(code) {
      loadedCode.push(code);
    });

    Promise.all([
      action2, action1
    ]).then(function() {
      expect(loadedCode).toEqual(['url1 source code', 'url2 source code']);
      done();
    });
  });
});
