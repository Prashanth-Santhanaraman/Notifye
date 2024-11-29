import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }

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
    if (!name || !email || !password) {
      return "Fill all details";
    }
    axios
      .post("http://localhost:5000/api/auth/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("signup successful", res.data);
        setToastMessage("Signup successful!");
        setIsSuccess(true);
        setIsError(false);
        setTimeout(() => {
          navigate("/login"); // Replace "/new-page" with your target route
        }, 5000);
        // navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setToastMessage(
          err.response ? err.response.data : "Error during signup"
        );
        setIsSuccess(false);
        setIsError(true);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="card w-96 bg-white shadow-lg p-6">
          <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input input-bordered w-full ${
                  nameError ? "input-error" : ""
                }`}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError ? (
                <>
                  <div className="label">
                    <span className="label-text-alt text-red-600">
                      Enter name
                    </span>
                  </div>
                </>
              ) : (
                " "
              )}
            </div>
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
              <label className="label cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="">Show Password</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-neutral w-full"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      {toastMessage && (
        <div className={`toast toast-top toast-center`}>
          <div
            className={`alert ${isSuccess ? "alert-success" : "alert-error"}`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
