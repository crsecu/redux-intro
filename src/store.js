import { combineReducers, createStore } from "redux";

/* 1. Create initial state object */
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

/*2. Define reducer function  
- the goal of the reducer function is to calculate new state based current state and on the received action
- reducers are not allowed to modify the existent state (they create new state) or handle any async logic or side effects
- unlike useReducer, in Redux, we pass the initial state as the default state(default parameter)
 */
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    /* action name convention advised by redux team - action name should model what happened, or what should happen:
"state domain/event name" */

    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      /* it's advised to return original state when the reducer receives an unknown action */
      return state;
  }
}

/* Create the Root Reducer by ombine all reducers */
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

/* 3. Create Redux Store */
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });

// console.log("Hey Redux");
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 100 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });

// console.log(store.getState());

// store.dispatch({
//   type: "account/payLoan",
// });

// console.log(store.getState());

/* Create action creator - one per each possible action */
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(requestLoan(7000, "coding bootcamp"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

/* Customer Action Creators  */
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

store.dispatch(createCustomer("John Doe", "765"));
console.log(store.getState());
store.dispatch(createCustomer("Will Smith", "11098"));
console.log(store.getState());
