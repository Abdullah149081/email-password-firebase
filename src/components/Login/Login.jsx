import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../Firebase/firebase.config";

const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlerLogin = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {})
      .catch((err) => {
        setError(err.message);
      });
  };
  const handlerPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero mt-20">
      <div className="hero-content flex-col w-full  lg:w-5/6 ">
        <div className="text-center ">
          <h1 className="text-2xl lg:text-5xl font-bold">Please Login!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handlerLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" />
            </div>

            <div className="mt-4">
              <span onClick={handlerPassword} className={`cursor-pointer  ${showPassword ? "text-[#1a73e8] font-bold" : "text-black"}  `}>
                Show Password
              </span>
            </div>

            <div className="flex justify-between items-center">
              <label className="label">
                <Link className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
              <label>
                New member ?
                <span>
                  <Link to="/sign-up" className="label-text-alt link link-hover text-blue-500  ml-2 ">
                    Register here
                  </Link>
                </span>
              </label>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
