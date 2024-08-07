import { connect } from "react-redux";

/* 
useSelector and useDispatch hooks are the modern way of using Redux in React
Before these hooks existed, developers used the Connect API (this method is still used in older codebases);

The component below uses the Connect API to read data from the Redux store.
*/

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

/* This function receives the state object from the Redux store */
function mapStateToProps(state) {
  /* This function returns an object where we can define the name of a prop that our component 
  should receive */
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);

/* 
  - connect() function is provided by the React-Redux library;
  - the connect() function takes in as an argument a function("mapStateToProps" - naming convention) 
  that in turn will return another function
  - the returned function will receive a component as an argument
  - the returned function is basically a component that receives the expected prop ("balance" prop in this example)

 */
