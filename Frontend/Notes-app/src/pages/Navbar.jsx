import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const localLoggedIn = localStorage.getItem("isLoggedIn") === "true";
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
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-neutral px-[20px] text-neutral-content">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl" onClick={() => {navigate("/home")}}>Notes</button>
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
                <ul>
                  {/* <button onClick={handleLogout} className="btn btn-nuetral">
                    Logout
                  </button> */}
                  <div class="dropdown dropdown-end">
                    <label
                      tabindex="0"
                      role="button"
                      class="avatar placeholder cursor-pointer"
                    >
                      <div class="bg-white text-success-content w-12 rounded-full">
                        <span>ava</span>
                      </div>
                    </label>

                    <ul
                      tabindex="0"
                      class="dropdown-content menu bg-white text-black rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <button onClick={() => {navigate("/home/settings")}}>Settings</button>
                      </li>
                      <li>
                        <button className="text-red-500 font-semibold" onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </ul>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
