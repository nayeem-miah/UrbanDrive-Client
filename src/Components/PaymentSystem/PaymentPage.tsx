import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentPage = () => {
  const  totalPrice  = 123;
  // console.log(totalPrice);
  return (
    <div className=" pt-20 min-h-[calc(100vh-180px)]">
      {/* <h3>payment page </h3> */}
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default PaymentPage;
