import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const cssClass = ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "navlink";

  return (
    <div className="header">
      <nav>
        <NavLink id="home"className={cssClass} to="/">
          Home
        </NavLink>
        <NavLink id="search"className={cssClass} to="/search">
          Search
        </NavLink>
        <NavLink id="matches"className={cssClass} to="/savedstocks">
          Matches
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;