import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const localLoggedIn = localStorage.getItem("isLoggedIn") === 'true'
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn","false")
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-neutral px-[20px] text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Notes</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {!localLoggedIn ? (
              <>
                <li>
                  <a href="/" className="btn btn-ghost">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/signup" className="btn btn-ghost">
                    Signup
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleLogout} className="btn btn-nuetral">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
