import React from "react";
import bgimg from "../../../assets/pexels-bertellifotografia-799443.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxoisPublic";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  // agreeToTerms: boolean;
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
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const password = watch("password");
  // const agreeToTerms = watch("agreeToTerms");

  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: data.role,
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
            navigate("/");
          }
        });
      })
      .catch();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex flex-col m-6 space-y-8 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-white font-Playfair">
            Create Account
          </span>
          <span className="text-gray-400 mb-8 font-Open font-bold">
            Join us! Please enter your details to register
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-md text-gray-300">Full Name</span>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              <span className="mb-2 text-md text-gray-300">Email</span>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your email"
                {...register("email", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 mt-2">Email is required*</span>
              )}
            </div>
            <div>
              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text font-medium">Role</span>
                </div>
                <select
                  defaultValue=""
                  {...register("role", { required: true })}
                  className="select select-bordered w-full bg-gray-700 rounded-md border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            </div>
            {/* <div className="py-4">
              <span className="mb-2 text-md text-gray-300">Password</span>
              <input
                type="password"
                id="password"
                className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Create a password"
              />

              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              {errors.password && (
                <span className="text-red-500 mt-2">
                  {errors.password.message}
                </span>
              )}
            </div> */}
            <div className="py-4">
              <span className="mb-2 text-md text-gray-300">
                Confirm Password
              </span>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 bg-gray-700 border border-teal-500 rounded-md placeholder:font-light placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Password do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 mt-3">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-start w-full py-4 text-gray-300">
              <input type="checkbox" id="terms" className="mr-2" />
              <span className="text-sm">
                I agree to the Terms and Conditions
              </span>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white p-2 rounded-lg mb-6 hover:bg-teal-500 hover:from-teal-500 hover:to-teal-500"
            />
          </form>
          <button className="w-full border border-teal-500 text-teal-500 text-md p-2 rounded-lg mb-6 hover:bg-teal-500 hover:text-white">
            Sign up with Google
          </button>
          <div className="text-center text-gray-400">
            Already have an account?{" "}
            <span className="font-bold text-teal-500 hover:text-teal-300 cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>

        <div className="relative">
          <img
            src={bgimg}
            alt="cool image"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />

          <div className="absolute hidden bottom-10 right-6 p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              Join us for your next adventure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
