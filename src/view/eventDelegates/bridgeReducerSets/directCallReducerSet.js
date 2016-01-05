export let configToState = (state, action) => {
  return state.merge(action.payload.config);
};

export let stateToConfig = (config, state) => {
  config.name = state.get('name');
  return config;
};

export let validate = state => {
  return state.setIn(['errors', 'nameInvalid'], !state.get('name'));
};

export default {
  configToState,
  stateToConfig,
  validate
};
