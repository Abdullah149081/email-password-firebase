import React from "react";
import ActiveLink from "../ActiveLink/ActiveLink";

const Header = () => {
  return (
    <nav className="flex justify-center  w-1/3 mx-auto  flex-col lg:flex-row   text-center   gap-6 mt-8">
      <ActiveLink className="default" to="/">
        Home
      </ActiveLink>
      <ActiveLink className="default" to="/sign-in">
        Sign in
      </ActiveLink>
      <ActiveLink className="default" to="/sign-up">
        Sign up
      </ActiveLink>
    </nav>
  );
};

export default Header;
