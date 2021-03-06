import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { loadSettings, saveSettings } from "./settingSaver";

const middleware = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initalState = {
  settings: loadSettings(),
  pending: false,
  focused: false,
  error: null,
  allAircraft: { pilots: [], atc: [] }
};

const store = createStore(
  rootReducer,
  initalState,
  composeEnhancer(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveSettings(store.getState().settings);
});

export default store;