import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav class="navbar navbar-light bg-light">
      <Link id="home-link" to="/" className="nav-link active" aria-current="page">
        Shoot The Hooch!
      </Link>
    </nav>
  );
};

export default Nav;
