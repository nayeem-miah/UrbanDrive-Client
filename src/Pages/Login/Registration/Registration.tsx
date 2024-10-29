import React, { useState } from "react";
import bgimg from "../../../assets/ladingpage.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type Inputs = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
};


const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { createUser , googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);


  const password = watch("password");
  // const agreeToTerms = watch("agreeToTerms");

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "User",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data)
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Sign up",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location.state ? location.state : "/");
          }
        });
      })
      .catch();
  };

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
      <div className="relative flex gap-9 flex-col justify-center items-center m-6 space-y-8 bg-slate-50 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-black text-center font-poppins">
            Create Account
          </span>
          <span className="text-gray-400 mb-8 font-Open font-bold">
            Join us! Please enter your details to register
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-[14px] text-md text-black font-medium ml-1">
                Full Name
              </span>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("name", { required: true })}
                placeholder="Full Name"
              />
              {errors.name && (
                <span className="text-red-500 mt-2">
                  Full name is required*
                </span>
              )}
            </div>
            <div className="py-4">
              <span className="text-[14px] text-md text-black font-medium ml-1">
                Email
              </span>
              <input
                type="email"
                className="w-full mt-2 p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your email"
                {...register("email", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 mt-2">Email is required*</span>
              )}
            </div>
            {/* <div>
              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text font-medium">Role</span>
                </div>
                <select
                  defaultValue=""
                  {...register("role", { required: true })}
                  className="w-full p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option className="text-white" disabled value="">
                    Select a role
                  </option>
                  <option value="User">User</option>
                  <option value="Seller">Driver</option>
                </select>
                {errors.role && (
                  <span className="text-red-500 mt-2">Role is required</span>
                )}
              </label>
            </div> */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="w-full p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  // pattern:
                  //   /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600 mt-2">Password is required</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 mt-2">
                  Password should be max 20 character
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 mt-2">
                  Password should be minimum 6 character
                </p>
              )}
              {/* {errors.password?.type === "pattern" && (
                    <p className="text-red-600 mt-2">
                      Password should have one upper case one lower case a
                      number and a special character
                    </p>
                  )} */}
              <span
                className="absolute bottom-3 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className=""></FaEyeSlash>
                ) : (
                  <FaEye className="" />
                )}
              </span>
            </div>
            <div className="py-4 relative">
              <span className=" text-[14px] text-md text-black font-medium ml-1">
                Confirm Password
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full mt-2 p-2 border rounded-md placeholder:font-light placeholder:text-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Password do not match",
                })}
              />
              <span
                className="absolute bottom-7 right-3"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash></FaEyeSlash>
                ) : (
                  <FaEye className="" />
                )}
              </span>
              {errors.confirmPassword && (
                <span className="text-red-500 mt-3">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-start w-full py-4 text-gray-500">
              <input type="checkbox" id="terms" className="mr-2" />
              <span className="text-sm font-medium">
                I agree to the Terms and Conditions
              </span>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-primary border-2 outline-none border-primary text-white p-2 rounded-lg mb-6 hover:bg-white hover:border-primary hover:text-primary font-medium cursor-pointer"
            />
          </form>
          <button
            onClick={handleGoogleLogIn}
            className="w-full border border-primary text-primary font-medium text-md p-2 rounded-lg mb-6 hover:bg-second hover:text-white hover:bg-primary"
          >
            Sign up with Google
          </button>
          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <span className="font-bold text-primary hover:text-second cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>

        <div className="relative">
          <img
            src={bgimg}
            alt="cool image"
            className="w-[600px] hidden rounded-r-2xl md:block"
          />

          {/* <div className="absolute hidden bottom-10 right-6 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Join us for your next adventure
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
