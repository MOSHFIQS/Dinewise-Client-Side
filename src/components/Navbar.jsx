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
    <div className="navbar  md:text-white bg-black/55 md:border-b-4 shadow-sm uppercase fixed z-20 backdrop-blur-md ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavLink>Home </NavLink>
            <NavLink>Contact Us</NavLink>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
            <NavLink to={"/menu"}>Our Menu</NavLink>
            <NavLink to={"/ourShop"}>Our Shop</NavLink>

            <div className="indicator">
              <span className="indicator-item badge-sm text-rose-400 font-extrabold ">
                {cart.length}
              </span>
              <button className="">my cart</button>
            </div>

            {user ? (
              <button onClick={handleLogout}>SignOUt</button>
            ) : (
              <>
                <NavLink to={"login"}>Sign In</NavLink>
                <NavLink to={"/signup"}>Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
        <a className="btn btn-ghost text-xl">Bistro</a>
      </div>
      <div className=" "></div>
      <div className="navbar-end hidden lg:flex w-full">
        <div className="menu menu-horizontal px-1 flex-nowrap gap-5">
          <NavLink>Home </NavLink>
          <NavLink>Contact Us</NavLink>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
          <NavLink to={"/menu"}>Our Menu</NavLink>
          <NavLink to={"/ourShop"}>Our Shop</NavLink>
          <NavLink to={"/dashboard/myCart"} className="indicator">
            <span className="indicator-item badge-sm text-rose-400 font-extrabold ">
              {cart.length}
            </span>
            <button className="">my cart</button>
          </NavLink>

          {user ? (
            <button onClick={handleLogout}>SignOUt</button>
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
