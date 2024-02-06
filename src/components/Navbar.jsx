// eslint-disable-next-line no-unused-vars
import React from "react";
import img from '../assets/temp.jpg'
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
        <nav className=" h-[4rem] flex justify-around bg-slate-500 p-0">
            <img src={img} alt="" />
            <ul className="flex gap-[5rem] items-center">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/AboutUs">About Us</Link>
                </li>
                <li>
                    <Link to="/Services">Services</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact Us</Link>
                </li>
                <li>
                    <Link to="/tmcomp">ML</Link>
                </li>
            </ul>
            <button>hello</button>
        </nav>
        <Outlet/>
            {/* <button>HOME</button> */}
        </>
    )
}

export default Navbar;