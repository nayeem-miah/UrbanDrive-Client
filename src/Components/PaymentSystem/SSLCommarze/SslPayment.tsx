import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const SslPayment: React.FC = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const paymentInfo = {
        price: 23,
        currency: 'BDT',
        email: user?.email,
        name: user?.displayName
    }

    const handleSubmit = async () => {
        try {
            // post request
            const { data } = await axiosPublic.post("/create-payment", paymentInfo);
            const redirectUrl = data.paymentUrl;
            // console.log(redirectUrl);
            if (redirectUrl) {
                window.location.replace(redirectUrl)
            }
        } catch (error: any) {
            console.error("Error posting payment info:", error);
            toast.error(error.message);
        }
    }
    return (
        <div className="my-12">
            <button onClick={handleSubmit} className="btn btn-primary">submit</button>
        </div>
    );
};

export default SslPayment;