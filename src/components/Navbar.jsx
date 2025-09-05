import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { logOutUser, user } = useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();

  const handleLogout = () => {
    logOutUser().then((res) => {
      navigate("/");
    });
  };

  return (
    <div className="navbar  md:text-white bg-white md:bg-black/25 md:border-b-4   fixed z-20 backdrop-blur-lg  uppercase px-2 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="p-2 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 w-screen -left-2 z-1 mt-3  p- space-y-3 border-y "
          >
            <NavLink>Homes </NavLink>
            <NavLink to={'/contactUs'}>Contact Us</NavLink>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
            <NavLink to={"/menu"}>Our Menu</NavLink>
            <NavLink to={"/ourShop"}>Our Shop</NavLink>

            <div className="indicator">
              <span className="indicator-item badge-sm text-rose-400 font-extrabold ">
                {cart.length}
              </span>
              <button className="">MY CART</button>
            </div>

            {user ? (
              <button onClick={handleLogout}>SignOUt</button>
            ) : (
              <>
                <NavLink to={"login"} >Sign In</NavLink>
                <NavLink to={"/signup"} >Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
        <a className=" text-xl font-extrabold ">Dinewise</a>
      </div>
      <div className=" "></div>
      <div className="navbar-end hidden lg:flex w-full">
        <div className="menu menu-horizontal px-1 flex-nowrap gap-5">
          <NavLink to={"/"}>Home </NavLink>
          <NavLink to={'/contactUs'}>Contact Us</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          <NavLink to={"/menu"}>Our Menu</NavLink>
          <NavLink to={"/ourShop"}>Our Shop</NavLink>
          <NavLink to={"/dashboard/myCart"} className="indicator">
            <span className="indicator-item badge-sm text-rose-400 font-extrabold ">
              {cart.length}
            </span>
            <button className="">MY CART</button>
          </NavLink>

          {user ? (
            <button onClick={handleLogout} className="uppercase">SignOUt</button>
          ) : (
            <>
              <NavLink to={"login"}>Sign In</NavLink>
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
