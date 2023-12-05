import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const cssClass = ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "navlink";

  return (
    <div className="header">
      <nav>
        <NavLink className={cssClass} to="/">
          Home
        </NavLink>
        <NavLink className={cssClass} to="/savedstocks">
          Matches
        </NavLink>
        <NavLink className={cssClass} to="/search">
          Search
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;