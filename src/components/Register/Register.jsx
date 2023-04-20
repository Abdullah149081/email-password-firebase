import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import app from "../../Firebase/firebase.config";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);

  const handlerSubmit = (event) => {
    // clear error
    setError("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.text.value;

    // password validation
    if (password.length < 6) {
      setError("Password must be 6 Characters ");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError("should password at least one digit");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError("should password at least one lower case");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setError("should password at least one upper case");
      return;
    } else if (!/(?=.*[`!@#$%^&*:_=-])/.test(password)) {
      setError("should password at least one special case letter.");
      return;
    }
    // Create a new account firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        toast.success("Successfully Register", {
          duration: 1000,
        });
        // form clear
        event.target.reset();
        validationEmail(newUser);
        updateUserData(newUser, name);
      })
      .catch((err) => {
        console.error(err.message);
        setError(err?.statusText || err?.message);
      });
  };

  const validationEmail = (newUser) => {
    sendEmailVerification(newUser).then(() => {
      toast("verification email ");
    });
  };

  const handlerPassword = () => {
    setShowPassword(!showPassword);
  };

  const updateUserData = (newUser, name) => {
    console.log(newUser, name);
    updateProfile(newUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="hero mt-20">
      <div className="hero-content flex-col w-full  lg:w-5/6 ">
        <div className="text-center ">
          <h1 className="text-2xl lg:text-5xl font-bold">Please Register!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handlerSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="text" placeholder="Type your name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
              <div className="mt-4">
                <span onClick={handlerPassword} className={`cursor-pointer  ${showPassword ? "text-[#1a73e8] font-bold" : "text-black"}  `}>
                  Show Password
                </span>
              </div>

              <label className="mt-4 text-lg ">
                Already account ?
                <span>
                  <Link to="/sign-in" className="label-text-alt link link-hover text-blue-500 text-base ml-2 ">
                    Login here.
                  </Link>
                </span>
              </label>
            </div>
            <p className="text-red-600 font-medium">{error}</p>

            <div className="form-control mt-6">
              <button className="btn btn-primary">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
