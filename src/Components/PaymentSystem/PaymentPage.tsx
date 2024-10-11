import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with the publishable key
const stripePromise: Promise<Stripe | null> = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);


const PaymentPage: React.FC = () => {
  const { planName, totalPrice } = useParams<{
    planName: string;
    totalPrice: string;
  }>();

  const price = totalPrice ? parseFloat(totalPrice) : NaN;
  if (isNaN(price)) {
    return <div>Error: Invalid price</div>;
  }

  const isMembershipPayment = planName === "membership";

  return (
    <div className="pt-20 min-h-[calc(100vh-180px)] bg-[url('https://img.freepik.com/premium-photo/bank-card-payment-black-hand-holding-3d-render_1106493-106452.jpg?w=1060')] bg-cover bg-center  items-center justify-center">
      <h1 className="lg:text-4xl text-3xl font-bold text-white text-center py-4">
        Secure Payment
      </h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          price={price}
          planName={planName}
          isMembershipPayment={isMembershipPayment}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
