/* This is a slice of total state
Here we will place the reducer, the action creators and initial state
We will then export them and put them back together in the store
 */

import { createSlice } from "@reduxjs/toolkit";

/* 1. Create initial state object */
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        const createdAt = new Date().toISOString();

        return {
          payload: {
            fullName,
            nationalID,
            createdAt,
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer } = customerSlice.actions;
export default customerSlice.reducer;

/* 2. Define reducer function  
- the goal of the reducer function is to calculate new state based current state and on the received action
- reducers are not allowed to modify the existent state (they create new state) or handle any async logic or side effects
- unlike useReducer, in Redux, we pass the initial state as the default state(default parameter)
 */

// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// /* 3. Create Action Creators - one per each possible action */
// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
