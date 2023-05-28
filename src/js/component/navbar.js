import React from "react";
import { Link } from "react-router-dom";
import { DropdownFav } from "./DropdownFav.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJedi } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <nav className="navbar ">
      <div className="container">
        <Link to="/">
          <img
            id="nav-logo"
            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
            alt="Star Wars Logo"
          ></img>
        </Link>
        <div className="ml-auto">
          <DropdownFav />
          {/* <Link to="/demo">
						<DropdownFav />
					</Link> */}
        </div>
      </div>
    </nav>
  );
};
