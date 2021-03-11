import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import { NavLink } from "react-router-dom";
import Button from "../lib/Button";

export default function Navbar() {
  const [isThemeDark, setIsThemeDark] = useState(() => {
    if (localStorage.getItem("isThemeDark")) {
      return localStorage.getItem("isThemeDark") === "true";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    } else return false;
  });
  const app = useContext(AppContext);

  useEffect(() => {
    if (JSON.stringify(isThemeDark)) {
      localStorage.setItem("isThemeDark", JSON.stringify(isThemeDark));
    }

    if (isThemeDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isThemeDark]);

  function handleToggleTheme() {
    setIsThemeDark((prevTheme) => !prevTheme);
  }

  const cartCount = app.getCartCount();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        Supermarket
      </NavLink>
      <ul>
        <li className="nav-item">
          <Button outline onClick={handleToggleTheme}>
            {isThemeDark ? "Dark" : "Light"}
          </Button>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            className="nav-item nav-cart btn btn-accent"
            to="/cart"
          >
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
