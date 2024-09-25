import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../assets/pexels-hamann.jpg';
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxoisPublic';
import Swal from 'sweetalert2';


type Inputs = {
  email: string
  password: string
}

const LoginPage: React.FC = () => {
  const { signIn, googleSignIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-gray-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >  
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-white font-Playfair">Welcome back</span>
          <span className="text-gray-400 mb-8 font-Open font-bold">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
            <span className="mb-2 text-md text-gray-300">Email</span>
            <input
              type="text"
              placeholder='Type your name'
              className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("email", { required: true })}
            />
            
          </div>
          <div className="py-4">
            <span className="mb-2 text-md text-gray-300">Password</span>
            <input
              type="password"
              placeholder='Type your password'
              className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 mt-2">
                Password is required*
              </span>
            )}
          </div>
          <div className="flex justify-between w-full py-4 text-gray-300">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember me</span>
            </div>
            <span className="font-bold text-teal-500 hover:text-teal-300 cursor-pointer">Forgot password</span>
          </div>
          <button className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white p-2 rounded-lg mb-6 hover:bg-teal-500 hover:from-teal-500 hover:to-teal-500">
            Sign in
          </button>
          
          </form>
          <button onClick={handleGoogleLogIn} className="w-full border border-teal-500 text-teal-500 text-md p-2 rounded-lg mb-6 hover:bg-teal-500 hover:text-white">
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account? <span className="font-bold text-teal-500 hover:text-teal-300 cursor-pointer"><Link to="/register">Sign up</Link></span>
          </div>
        </div>
        
        <div className="relative">
          <img
            src={img1}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl">
              Start planning your next trip
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
