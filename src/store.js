/* 1. Create initial state object */
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

/*2. Define reducer function  
- the goal of the reducer function is to calculate new state based current state and on the received action
- reducers are not allowed to modify the existent state (they create new state) or handle any async logic or side effects
- unlike useReducer, in Redux, we pass the initial state as the default state(default parameter)
 */
function reducer(state = initialState, action) {
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
      //LATER
      return { ...state, loan: action.payload };
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
