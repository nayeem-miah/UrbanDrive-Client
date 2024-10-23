import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState } from "react";
import "./CheckoutForm.css";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  price: number;
  planName?: string; // Optional, only passed for membership payment
  isMembershipPayment: boolean; // To differentiate between membership and booking payments
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, planName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [cardError, setCardError] = useState<string>("");
  const [cardSuccess, setCardSuccess] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
//   console.log('planName:',planName)
//   console.log('price:',price)

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

    const { error } = await stripe.createPaymentMethod({
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
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          membershipPlan:planName,
        };

        try {
           await axiosPublic.post("/membership-payment", { paymentInfo, membershipInfo });
           await axiosPublic.patch("/update-plan", { email: user?.email, planName: planName });
          setCardSuccess(paymentIntent.id);
          toast.success(`${user?.email} payment successful for membership`);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        //   if (response.data.success) {
        //     const result = await Swal.fire({
        //       title: 'Payment Confirmed!',
        //       text: 'Your Payment has been successfully confirmed.',
        //       icon: 'success',
        //       confirmButtonText: 'Go to Home',
        //       allowOutsideClick: false,
        //     })
        //       if (result.isConfirmed) {
        //         navigate("/"); // Navigate to home page
        //       }
        //     ;
        //   }
        } catch (error) {
          console.error("Error posting membership payment info:", error);
        }

      } else {
        // Handle Booking payment
        try {
           await axiosPublic.post("/payment", paymentInfo);
          setCardSuccess(paymentIntent.id);
          toast.success(`${user?.email} payment successful for booking`);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        //  if (response.data.success) {
        //     const result = await Swal.fire({
        //       title: 'Payment Confirmed!',
        //       text: 'Your Payment has been successfully confirmed.',
        //       icon: 'success',
        //       confirmButtonText: 'Go to Home',
        //       allowOutsideClick: false,
        //     })
        //       if (result.isConfirmed) {
        //         navigate("/"); // Navigate to home page
        //       }
        //    ;
        //   } else {
        //     console.error('Failed to update booking:', response.data.message);
        //   }
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
            <Toaster></Toaster>
        </form>
  );
};

export default CheckoutForm;
