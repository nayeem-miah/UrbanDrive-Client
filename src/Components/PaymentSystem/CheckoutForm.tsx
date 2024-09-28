
/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

interface CheckoutFormProps {
    price: number
}
;
const CheckoutForm: React.FC<CheckoutFormProps> = ({ price: price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [cardError, setCardError] = useState<string>("");
    const [cardSuccess, setCardSuccess] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);

    useEffect(() => {
        // Fetch client secret
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
        console.log("[paymentMethod]", paymentMethod);

        if (error) {
            console.error("[error]", error);
            setCardError(error.message ?? "An error occurred");
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
            console.error(confirmError);
            setCardError(confirmError?.message ?? 'An error occurred');
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
                name: user?.displayName,
                email: user?.email,
                transactionId: paymentIntent.id,

                date: new Date(),
            };
            setCardSuccess(paymentInfo.transactionId)

            toast.success(`${user?.email} payment successful`);

            try {
                await axiosPublic.post("/payment", paymentInfo);
            } catch (error) {
                console.error("Error posting payment info:", error);
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="items-center justify-center w-1/2 h-full mx-auto ">
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
                    `Pay $ (${price})`
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
