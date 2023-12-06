import React from "react";
import ReactDOM from 'react-dom'
import StockCard from "./StockCard"
import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";



function Header() {


  return (
    <div className="header">
      <nav>
        <NavLink id="search" to="/search">
          <FaSearch />
        </NavLink>
        <NavLink id="home" to="/">
          <FaHome />
        </NavLink>
        <NavLink id="matches" to="/savedstocks">
          <FaFire />
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;