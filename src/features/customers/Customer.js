import { useSelector } from "react-redux";

function Customer() {
  /* The useSelector hook creates a subscription to the Redux Store
  - whenever the store changes, this component that is subscribed to the store will re-render*/
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
