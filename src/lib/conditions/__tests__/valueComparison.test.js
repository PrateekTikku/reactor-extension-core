/***************************************************************************************
 * (c) 2017 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 ****************************************************************************************/

'use strict';


var conditionDelegate = require('../valueComparison');

describe('value comparison delegate', function() {
  describe('equals operator', function() {
    it('returns true on string match', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'equals'
        },
        rightOperand: 'abc'
      })).toBe(true);
    });

    it('returns false on case mismatch', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'equals'
        },
        rightOperand: 'Abc'
      })).toBe(false);
    });

    it('returns true on case mismatch with case insensitivity enabled', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'equals',
          caseInsensitive: true
        },
        rightOperand: 'Abc'
      })).toBe(true);
    });

    it('returns true on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '123',
        comparison: {
          operator: 'equals'
        },
        rightOperand: 123
      })).toBe(true);
    });

    it('returns true on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '123',
        comparison: {
          operator: 'equals'
        },
        rightOperand: 123
      })).toBe(true);
    });

    it('returns true on object match', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'equals'
        },
        rightOperand: obj
      })).toBe(true);
    });

    it('returns true on boolean match', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'equals'
        },
        rightOperand: true
      })).toBe(true);
    });

    it('returns false on string+boolean match', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'equals'
        },
        rightOperand: 'true'
      })).toBe(false);
    });
  });

  describe('contains operator', function() {
    it('returns true on string match', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'contains'
        },
        rightOperand: 'b'
      })).toBe(true);
    });

    it('returns false on string mismatch', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'contains'
        },
        rightOperand: 'd'
      })).toBe(false);
    });

    it('returns true on case mismatch with case insensitivity enabled', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'contains',
          caseInsensitive: true
        },
        rightOperand: 'B'
      })).toBe(true);
    });

    it('returns true on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '123',
        comparison: {
          operator: 'contains'
        },
        rightOperand: 2
      })).toBe(true);
    });

    it('returns true on number+string match', function() {
      debugger;
      expect(conditionDelegate({
        leftOperand: 123,
        comparison: {
          operator: 'contains'
        },
        rightOperand: '2'
      })).toBe(true);
    });

    it('returns false on object match', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'contains'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean match', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'contains'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null match', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'contains'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('startsWith operator', function() {
    it('returns true on string match', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: 'a'
      })).toBe(true);
    });

    it('returns false on string mismatch', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: 'b'
      })).toBe(false);
    });

    it('returns true on case mismatch with case insensitivity enabled', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'startsWith',
          caseInsensitive: true
        },
        rightOperand: 'A'
      })).toBe(true);
    });

    it('returns true on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '123',
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: 1
      })).toBe(true);
    });

    it('returns true on number+string match', function() {
      debugger;
      expect(conditionDelegate({
        leftOperand: 123,
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: '1'
      })).toBe(true);
    });

    it('returns false on object match', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean match', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null match', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'startsWith'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('endsWith operator', function() {
    it('returns true on string match', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: 'c'
      })).toBe(true);
    });

    it('returns false on string mismatch', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: 'b'
      })).toBe(false);
    });

    it('returns true on case mismatch with case insensitivity enabled', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'endsWith',
          caseInsensitive: true
        },
        rightOperand: 'C'
      })).toBe(true);
    });

    it('returns true on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '123',
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: 3
      })).toBe(true);
    });

    it('returns true on number+string match', function() {
      debugger;
      expect(conditionDelegate({
        leftOperand: 123,
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: '3'
      })).toBe(true);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'endsWith'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('matchesRegex operator', function() {
    it('returns true on string match', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: 'a.c'
      })).toBe(true);
    });

    it('returns false on string mismatch', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: 'aBc'
      })).toBe(false);
    });

    it('returns true on case mismatch with case insensitivity enabled', function() {
      expect(conditionDelegate({
        leftOperand: 'abc',
        comparison: {
          operator: 'matchesRegex',
          caseInsensitive: true
        },
        rightOperand: 'aBc'
      })).toBe(true);
    });

    it('returns false on string+number match', function() {
      expect(conditionDelegate({
        leftOperand: '3',
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: 3
      })).toBe(false);
    });

    it('returns true on number+string match', function() {
      debugger;
      expect(conditionDelegate({
        leftOperand: 3,
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: '3'
      })).toBe(false);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'matchesRegex'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('lessThan operator', function() {
    it('returns true when left less than right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: 2
      })).toBe(true);
    });

    it('returns false when left not less than right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: 1
      })).toBe(false);
    });

    it('returns true when left less than right (strings)', function() {
      expect(conditionDelegate({
        leftOperand: '1',
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: '2'
      })).toBe(true);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'lessThan'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('lessThanOrEqualTo operator', function() {
    it('returns true when left less right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: 2
      })).toBe(true);
    });

    it('returns true when left equal to right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: 1
      })).toBe(true);
    });

    it('returns false when left greater than right', function() {
      expect(conditionDelegate({
        leftOperand: 3,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: 1
      })).toBe(false);
    });

    it('returns true when left equal to right (strings)', function() {
      expect(conditionDelegate({
        leftOperand: '1',
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: '1'
      })).toBe(true);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'lessThanOrEqualTo'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('greaterThan operator', function() {
    it('returns true when left greater than right', function() {
      expect(conditionDelegate({
        leftOperand: 2,
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: 1
      })).toBe(true);
    });

    it('returns false when left not greater than right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: 1
      })).toBe(false);
    });

    it('returns true when left greater than right (strings)', function() {
      expect(conditionDelegate({
        leftOperand: '2',
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: '1'
      })).toBe(true);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'greaterThan'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('greaterThanOrEqualTo operator', function() {
    it('returns true when left greater than right', function() {
      expect(conditionDelegate({
        leftOperand: 2,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: 1
      })).toBe(true);
    });

    it('returns true when left equal to right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: 1
      })).toBe(true);
    });

    it('returns false when left less than right', function() {
      expect(conditionDelegate({
        leftOperand: 1,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: 2
      })).toBe(false);
    });

    it('returns true when left equal to right (strings)', function() {
      expect(conditionDelegate({
        leftOperand: '1',
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: '1'
      })).toBe(true);
    });

    it('returns false on object comparison', function() {
      var obj = {};
      expect(conditionDelegate({
        leftOperand: obj,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: obj
      })).toBe(false);
    });

    it('returns false on boolean comparison', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: true
      })).toBe(false);
    });

    it('returns false on null comparison', function() {
      expect(conditionDelegate({
        leftOperand: null,
        comparison: {
          operator: 'greaterThanOrEqualTo'
        },
        rightOperand: null
      })).toBe(false);
    });
  });

  describe('isTrue operator', function() {
    it('returns true when value is true', function() {
      expect(conditionDelegate({
        leftOperand: true,
        comparison: {
          operator: 'isTrue'
        }
      })).toBe(true);
    });

    it('returns false when value is anything else', function() {
      expect(conditionDelegate({
        leftOperand: 'true',
        comparison: {
          operator: 'isTrue'
        }
      })).toBe(false);
    });
  });

  describe('isFalse operator', function() {
    it('returns true when value is false', function() {
      expect(conditionDelegate({
        leftOperand: false,
        comparison: {
          operator: 'isFalse'
        }
      })).toBe(true);
    });

    it('returns false when value is anything else', function() {
      expect(conditionDelegate({
        leftOperand: 0,
        comparison: {
          operator: 'isFalse'
        }
      })).toBe(false);
    });
  });
});

