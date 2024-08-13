/* This is a slice of total state
Here we will place the reducer, the action creators and initial state
We will then export them and put them back together in the store
 */

import { createSlice } from "@reduxjs/toolkit";

/* 1. Create initial state object */
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log("account slice ", accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export function deposit(amount, currency) {
  console.log(amount, currency);
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  /* middleware: dispatch function will return a function instead of an object,
  we will dispatch a function; redux will know that that function is a thunk;
  it will execute that function and not immediately dispatch the
  action to the store
  basically, redux knows that the below function is a async action that we want to
  execute before dispatching to the store
   */
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    /* API call */
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    /*  return action */

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;

/*2. Define reducer function  
- the goal of the reducer function is to calculate new state based current state and on the received action
- reducers are not allowed to modify the existent state (they create new state) or handle any async logic or side effects
- unlike useReducer, in Redux, we pass the initial state as the default state(default parameter)
 */
/////////////////////////////
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     /* action name convention advised by redux team - action name should model what happened, or what should happen:
//   "state domain/event name" */

//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       /* it's advised to return original state when the reducer receives an unknown action */
//       return state;
//   }
// }

// /* Create Action Creators - one per each possible action */
// export function deposit(amount, currency) {
//   console.log(amount, currency);
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   /* middleware: dispatch function will return a function instead of an object,
//   we will dispatch a function; redux will know that that function is a thunk;
//   it will execute that function and not immediately dispatch the
//   action to the store
//   basically, redux knows that the below function is a async action that we want to
//   execute before dispatching to the store
//    */
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     /* API call */
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     console.log(data);
//     const converted = data.rates.USD;
//     /*  return action */

//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }

// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
