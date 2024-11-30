import { useState } from "react";
import "../index.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login,logout} from "../store/authSlice"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  //Handling Login

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      setEmailError(true);
    }

    if (password.length === 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    if (email.trim() === "" || password.trim() === "") {
      console.log("Email or Password is missing");
      toast.error("Email or Password is missing");
    }
    axios
      .post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        dispatch(login(response.data.token));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn","true")
        navigate("/home");
      })
      .catch((error) => {
        // Handle error
        toast.error("Invalid Credential");
        console.error(
          "Error during login",
          error.response ? error.response.data : error.message
        );
      });

    console.log(userDetail);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="card w-96 bg-white shadow-lg p-6">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  emailError ? "input-error" : ""
                }`}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError ? (
                <>
                  <div className="label">
                    <span className="label-text-alt text-red-600">
                      Enter valid email
                    </span>
                  </div>
                </>
              ) : (
                " "
              )}
            </div>
            {/* {emailError ? (
              <span>
                <p className="text-xs text-red-600">Enter valid Email</p>
              </span>
            ) : (
              ""
            )} */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={!showPassword ? "password" : "text"}
                placeholder="Enter your password"
                className={`input input-bordered w-full ${
                  passwordError ? "input-error" : ""
                }`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError ? (
                <>
                  <div className="label">
                    <span className="label-text-alt text-red-600">
                      Enter password
                    </span>
                  </div>
                </>
              ) : (
                " "
              )}
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="label ml-0">Show Password</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-neutral w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
