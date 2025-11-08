import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, googleSignUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        const currUser = result.user;
        // console.log(currUser);
        e.target.reset();
        toast.success(`${currUser.displayName} Signed in successfully.`);
        navigate(location?.state || "/");
      })
      .catch((e) => {
        console.log(e);
  
        if (e.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please check and try again.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("No account found with this email. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This account has been disabled. Please contact support.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts. Please try again later.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
    });
  };
  const handleSignInWithGoogle = () => {
    googleSignUser()
      .then((result) => {
        const currUser = result.user;
        // console.log(currUser);
        toast.success(`${currUser.displayName} Signed in with Google successfully.`);
        navigate(location?.state || "/");
      })
      .catch((e) => {
        console.log(e);
  
        if (e.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in cancelled. Please try again.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else {
          toast.error("Google sign-in failed. Please try again later.");
        }
    });
  };


  return (
    <div
      className="flex-1 flex items-center justify-center bg-linear-to-br from-indigo-700 via-purple-600 to-pink-500
 py-8 px-4"
    >
      <div className="card bg-white/20 backdrop-blur-md w-full max-w-sm mx-auto shrink-0 shadow-2xl text-white border border-white/30">
        <div className="card-body">
          <h1 className="animate__animated animate__bounceInUp text-center text-xl font-bold mb-2 text-[#F7B267]">
            Welcome Back! Sign In Now
          </h1>
          <form onSubmit={handleSignIn}>
            <fieldset className="fieldset">
              <label className="label text-white">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                placeholder="Email"
                required
              />

              <div className="relative">
                <label className="label text-white mt-3">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                  placeholder="Password"
                  required
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute z-10 top-11 right-5"
                >
                  {showPass ? (
                    <FaEye className="text-black"></FaEye>
                  ) : (
                    <FaEyeSlash className="text-black"></FaEyeSlash>
                  )}
                </span>
              </div>

              <div className="mt-2">
                <Link
                  to={`/forgetPassword`}
                  type="button"
                  className="link link-hover font-medium text-[#F7B267]"
                >
                  Forgot password?
                </Link>
              </div>

              <button className="btn mt-5 bg-[#E38B29] hover:bg-[#F7B267] border-0 text-white font-semibold">
                Login
              </button>
            </fieldset>
          </form>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>
          {/* Google */}
          <button onClick={handleSignInWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <div className="flex gap-2">
            <span className="">Don’t have an account yet?</span>
            <Link
              to={`/auth/register`}
              className="text-orange-6 text-[#F7B267] font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
