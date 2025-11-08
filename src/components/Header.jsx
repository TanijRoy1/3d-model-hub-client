import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import MyContainer from "./MyContainer";
import { LuLogIn, LuRotate3D } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { IoLogoModelS, IoMdMenu, IoMdSettings } from "react-icons/io";
import { ImBoxAdd } from "react-icons/im";
import useAuth from "../hooks/useAuth";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

const Header = () => {
  const { user, signOutUser, setUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(()=> {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  },[theme])

  const handleTheme = (checked) => {
    setTheme( checked ? "dark" : "light");
  }

  const handleSignOutUser = () => {
    signOutUser().then(() => {
      toast.success("Sign Out successfully.");
      setUser(null);
    });
  };


  const links = (
    <>
      <li>
        <NavLink to={`/`} className={`myNavLink`}>
          <GoHomeFill />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={`/allModels`} className={`myNavLink`}>
          <IoLogoModelS />
          All Models
        </NavLink>
      </li>
      <li>
        <NavLink to={`/createModel`} className={`myNavLink`}>
          <ImBoxAdd />
          Add Model
        </NavLink>
      </li>
      <li>
        <NavLink to={`/myModels`} className={`myNavLink`}>
          <MdViewInAr />
          My Models
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm min-h-15 flex items-center px-4">
   
        <nav className="container mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              onClick={() => setShowMenu(!showMenu)}
              className="lg:hidden block cursor-pointer p-1"
            >
              {showMenu ? <IoClose /> : <IoMdMenu />}
            </span>
            <Link
              to={`/`}
              className="sm:text-2xl text-xl font-bold flex items-center sm:gap-1.5 gap-0.5"
            >
              <LuRotate3D />
              3D Model Hub
            </Link>
          </div>

          <ul className="lg:flex hidden items-center gap-2">{links}</ul>
          <ul
            className={`${
              showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-60"
            } transition-all duration-500 ease-in  transform flex absolute flex-col p-3 rounded-lg gap-2 text-white bg-blue-900 z-10 top-13 lg:hidden`}
          >
            {links}
          </ul>

          <div className="flex">
            {user ? (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-9 h-9 border-2 border-orange-500 cursor-pointer rounded-full object-cover"
                  />
                </div>
                <div
                  tabIndex="-1"
                  className="dropdown-content menu bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-700 border border-white/10 text-white transform -translate-x-47 rounded-xl z-10 w-56 p-4 shadow-xl"
                >
                  <div className="pb-3 border-b border-white/20">
                    <h1 className="text-lg font-semibold">
                      {user.displayName}
                    </h1>
                    <p className="text-sm text-violet-200">{user.email}</p>
                  </div>

                  <div className="mt-3 flex flex-col gap-1">
                    <Link className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition">
                      <FaUser className="text-violet-300" />
                      <span>Profile</span>
                    </Link>

                    <Link className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition">
                      <IoMdSettings className="text-violet-300" />
                      <span>Settings</span>
                    </Link>
                    <Link to={`/myDownloads`} className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition">
                      <FiDownload className="text-violet-300" />
                      <span>My Downloads</span>
                    </Link>

                    <div className="flex px-2 gap-1 items-center">
                      <p>Dark Theme</p>
                      <input type="checkbox" onChange={(e)=>handleTheme(e.target.checked)} defaultChecked={theme==="dark"? true : false} className="toggle" />
                    </div>

                    <button
                      onClick={handleSignOutUser}
                      className="flex items-center cursor-pointer gap-2 px-3 py-2 mt-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-500 hover:opacity-90 transition font-semibold text-white shadow-md"
                    >
                      <FaSignOutAlt className="text-white" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to={`/auth/login`} className="btn sm:px-4 px-2 btn-primary">
                <LuLogIn />
                Login
              </Link>
            )}
          </div>
        </nav>
      
    </div>
  );
};

export default Header;
