import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState } from "react";
import "./CheckoutForm.css";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

interface CheckoutFormProps {
  price: number;
  planName?: string; // Optional, only passed for membership payment
  isMembershipPayment: boolean; // To differentiate between membership and booking payments
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, planName, isMembershipPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");
  const [cardSuccess, setCardSuccess] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  console.log('planName:',planName)
  console.log('price:',price)

  useEffect(() => {
    // Fetch client secret when price is valid
    if (price && price > 0) {
      getClientSecret({ price: price });
    }
  }, [price]);

  const getClientSecret = async (price: { price: number }) => {
    try {
      const { data } = await axiosPublic.post(`/create-payment-intent`, price);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message ?? "An error occurred");
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError?.message ?? "An error occurred");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const paymentInfo = {
        name: user?.displayName,
        email: user?.email,
        transactionId: paymentIntent.id,
        amount: price,
        date: new Date(),
      };

      if (planName) {
        // Handle Membership payment
        const membershipInfo = {
          planName: planName, // Membership plan name
          name: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: price,
          purchaseDate: new Date(), 
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // এক বছরের মেয়াদ
          membershipPlan:planName,
        };

        try {
          await axiosPublic.post("/membership-payment", { paymentInfo, membershipInfo });
          setCardSuccess(paymentIntent.id);
          toast.success(`${user?.email} payment successful for membership`);
        } catch (error) {
          console.error("Error posting membership payment info:", error);
        }
      } else {
        // Handle Booking payment
        try {
          await axiosPublic.post("/payment", paymentInfo);
          setCardSuccess(paymentIntent.id);
          toast.success(`${user?.email} payment successful for booking`);
        } catch (error) {
          console.error("Error posting payment info:", error);
        }
      }

      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="items-center justify-center w-1/2 min-h-screen mx-auto ">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                className="btn bg-primary px-10 lg:w-[500px] md:w-[400px] w-[160px]"
                type="submit"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? (
                    <ImSpinner9 size={24} className="animate-spin m-auto text-green-400" />
                ) : (
                    `Pay`
                )}
            </button>
            {
                cardSuccess && <p className="text-green-600  lg:text-xl text-xs">
                    your transactionId is : <span className="text-green-700">{cardSuccess}</span></p>
            }
            {cardError && <p className="text-red-600 lg:text-xl text-xs">{cardError}</p>}
        </form>
  );
};

export default CheckoutForm;
