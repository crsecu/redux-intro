import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/* Create the Root Reducer by combining all reducers */
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/* Create Redux Store */
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
