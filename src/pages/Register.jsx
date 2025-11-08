import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { setUser, signUpUser, updateUser, googleSignUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
    const name = e.target.name.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%?&#^()\-_=+]{6,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter"
      );
      return;
    }

    signUpUser(email, password)
      .then((result) => {
        const currentUser = result.user;

        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...currentUser, displayName: name, photoURL: photoURL });
          })
          .catch((e) => {
            console.log(e);
            setUser(currentUser);
          });

        e.target.reset();
        toast.success("Account created successfully.");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database.");
        } else if (e.code === "auth/weak-password") {
          toast.error("Password must be at least 6 characters long.");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  const handleSignInWithGoogle = () => {
    googleSignUser()
      .then((result) => {
        const currUser = result.user;
        // console.log(currUser);
        toast.success(
          `${currUser.displayName} Signed in with Google successfully.`
        );
        navigate("/");
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
    <div className="flex-1 flex items-center justify-center bg-linear-to-br from-[#F7B267] via-[#E38B29] to-[#D62828] py-8 px-4">
      <div className="card bg-white/20 backdrop-blur-md w-full max-w-sm shrink-0 shadow-2xl text-white border border-white/30">
        <div className="card-body">
          <h1 className="animate__animated animate__bounceInUp text-center text-xl font-bold mb-2 text-[#184E77]">
            Create Your Account
          </h1>
          <form onSubmit={handleSignUp}>
            <fieldset className="fieldset">
              <label className="label text-white">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                placeholder="Name"
                required
              />

              <label className="label text-white mt-3">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="input input-bordered bg-white/70 text-black placeholder-gray-600"
                placeholder="Photo URL"
                required
              />

              <label className="label text-white mt-3">Email</label>
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

              <button className="btn mt-5 bg-[#184E77] hover:bg-[#1E6091] border-0 text-white font-semibold">
                Register
              </button>
            </fieldset>
          </form>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-16 bg-white/30"></div>
            <span className="text-sm text-white/70">or</span>
            <div className="h-px w-16 bg-white/30"></div>
          </div>

          {/* Google */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
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
            <span className="">Already have an account?</span>
            <Link
              to={`/auth/login`}
              className="text-[#184E77] font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
