import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Notes</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {!isLoggedIn ? (
              <>
                <li>
                  <a href="/login" className="btn btn-ghost">
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
                <h1 className="btn btn-ghost">Username</h1>
                <li>
                  <button onClick={handleLogout} className="btn btn-ghost">
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
