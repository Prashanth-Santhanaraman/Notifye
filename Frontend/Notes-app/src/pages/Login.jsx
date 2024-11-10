import { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userDetail, setUserDetail] = useState({})
  const navigate = useNavigate()
  //Handling Login
  const handleLogin = (e) => {
    e.preventDefault()
    if(email.trim() === "" || password.trim() === ""){
      console.log("Email or Password is missing")

    }
    axios
    .post("http://localhost:5000/api/auth/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("Login successful", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home")
    })
    .catch((error) => {
      // Handle error
      console.error("Error during login", error.response ? error.response.data : error.message);
    });

      console.log(userDetail)
  }

  return (
    <>
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
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-neutral w-full" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
