import { createStore, combineReducers } from "redux";
import authStore from "./authStore";
const rootReducer = combineReducers({
  auth: authStore,
});

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootStore = ReturnType<typeof rootReducer>;
