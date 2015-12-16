import bubblingReducerSet from '../bubblingReducerSet';
import { actionCreators } from '../../../../actions/bridgeAdapterActions';
import { Map, fromJS } from 'immutable';

let { configToState, stateToConfig } = bubblingReducerSet;

describe('configToState', () => {
  describe('for a new config', () => {
    let state;
    beforeEach(() => {
      state = configToState(Map(), actionCreators.setConfig({
        config: {},
        isNewConfig: true
      }));
    });

    it('sets bubbleFireIfParent to true', () => {
      expect(state.get('bubbleFireIfParent')).toBe(true);
    });

    it('sets bubbleFireIfChildFired to true', () => {
      expect(state.get('bubbleFireIfChildFired')).toBe(true);
    });

    it('sets bubbleStop to false', () => {
      expect(state.get('bubbleStop')).toBe(false);
    });
  });

  describe('for a specified config', () => {
    let state;
    beforeEach(() => {
      state = configToState(Map(), actionCreators.setConfig({
        config: {
          bubbleFireIfParent: false,
          bubbleFireIfChildFired: false,
          bubbleStop: true
        },
        isNewConfig: false
      }));
    });

    it('sets bubbleFireIfParent to the value from config', () => {
      expect(state.get('bubbleFireIfParent')).toBe(false);
    });

    it('sets bubbleFireIfParent to the value from config', () => {
      expect(state.get('bubbleFireIfChildFired')).toBe(false);
    });

    it('sets bubbleFireIfParent to the value from config', () => {
      expect(state.get('bubbleStop')).toBe(true);
    });
  });
});

describe('stateToConfig', () => {
  it('should return a config having bubbleFireIfParent: true ' +
    'when state contains bubbleFireIfParent: true', () => {
      let config = {};
      stateToConfig(config, fromJS({ bubbleFireIfParent: true }));
      expect(config.bubbleFireIfParent).toBe(true);
  });

  it('should return a config without bubbleFireIfParent ' +
    'when state contains bubbleFireIfParent: false', () => {
    let config = {};
    stateToConfig(config, fromJS({ bubbleFireIfParent: false }));
    expect(config.bubbleFireIfParent).toBeUndefined();
  });

  it('should return a config having bubbleFireIfChildFired: true ' +
    'when state contains bubbleFireIfChildFired: true', () => {
    let config = {};
    stateToConfig(config, fromJS({ bubbleFireIfChildFired: true }));
    expect(config.bubbleFireIfChildFired).toBe(true);
  });

  it('should return a config without bubbleFireIfChildFired ' +
    'when state contains bubbleFireIfChildFired: false', () => {
    let config = {};
    stateToConfig(config, fromJS({ bubbleFireIfChildFired: false }));
    expect(config.bubbleFireIfChildFired).toBeUndefined();
  });

  it('should return a config having bubbleStop: true ' +
    'when state contains bubbleStop: true', () => {
    let config = {};
    stateToConfig(config, fromJS({ bubbleStop: true }));
    expect(config.bubbleStop).toBe(true);
  });

  it('should return a config without bubbleStop ' +
    'when state contains bubbleStop: false', () => {
    let config = {};
    stateToConfig(config, fromJS({ bubbleStop: false }));
    expect(config.bubbleStop).toBeUndefined();
  });
});
