import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-center gap-6 mt-8">
      <Link className="btn" to="/">
        Home
      </Link>
      <Link className="btn" to="/sign-in">
        Sign in
      </Link>
      <Link className="btn" to="/sign-up">
        Sign up
      </Link>
    </nav>
  );
};

export default Header;
