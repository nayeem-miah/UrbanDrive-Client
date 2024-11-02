import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../assets/ladingpage.png';
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';


type Inputs = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });
         navigate(location.state ? location.state : "/");
      })
      .catch();}

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then(async (result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "User",
        };
        // console.log(userInfo)
        await axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data)
          if (res.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully logged in",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location.state ? location.state : "/");
          }
        });
      })
      .catch();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex gap-9 flex-col m-6 space-y-8 bg-slate-50 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-black text-center font-poppins">
            Welcome back
          </span>
          <span className="text-gray-400 mb-8 font-Open font-bold">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-md text-black font-medium ml-1">
                Email
              </span>
              <input
                type="text"
                placeholder="Type your name"
                className="w-full p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("email", { required: true })}
              />
            </div>
            <div className="py-4 relative">
              <span className="mb-2 text-md text-black font-medium ml-1">
                Password
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Type your password"
                className="w-full p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("password", { required: true })}
              />
              <span
                className="absolute bottom-7 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className=""></FaEyeSlash>
                ) : (
                  <FaEye />
                )}
              </span>
              {errors.password && (
                <span className="text-red-500 mt-2">Password is required*</span>
              )}
            </div>
            <div className="flex justify-between items-center w-full py-4 text-black">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-[14px] font-bold font-poppins">
                  Remember me
                </span>
              </div>
              <span className="font-bold text-primary hover:text-second cursor-pointer">
                Forgot password
              </span>
            </div>
            <button className="w-full bg-primary border-2 outline-none border-primary text-white p-2 rounded-lg mb-6 hover:bg-white hover:border-primary hover:text-primary font-medium ">
              Sign in
            </button>
          </form>
          <button
            onClick={handleGoogleLogIn}
            className="w-full border border-primary text-primary font-medium text-md p-2 rounded-lg mb-6 hover:bg-second hover:text-white hover:bg-primary"
          >
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <span className="font-bold text-primary hover:text-second cursor-pointer">
              <Link to="/register">Sign up</Link>
            </span>
          </div>
        </div>

        <div className="relative">
          <img
            src={img1}
            alt="img"
            className="w-[600px] h-full hidden rounded-r-2xl md:block object-cover"
          />

          {/* <div
            className="absolute hidden bottom-10 right-6 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl">
              Start planning your next trip
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
