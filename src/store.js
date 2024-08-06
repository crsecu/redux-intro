import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/* Create the Root Reducer by combining all reducers */
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/* Create Redux Store */
const store = createStore(rootReducer);

export default store;
