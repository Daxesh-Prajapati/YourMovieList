import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cinema-logo.svg";

export default function NavBar() {
  return (
    <nav>
      <ul className="navbar">
        <li className="nav-items ">
          <Link className="listlink" to="/movies">
            <ul className="logo-list">
              <li className="logo-img-list">
                <img className="logo-img" src={logo} alt="Logo Image" />
              </li>
              <li className="logo-text ">YourMovieList</li>
            </ul>
          </Link>
        </li>
        <li className="nav-items ">
          <ul className="nav-option-list">
            <li className="nav-options ">
              <Link className="listlink" to="/watchlist">
                Watchlist
              </Link>
            </li>
            <li className="nav-options ">
              <Link className="listlink" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
