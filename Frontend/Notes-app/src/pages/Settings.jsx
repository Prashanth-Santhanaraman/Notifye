import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import axios from "axios";

export default function Settings() {
  const [passwordChange, setPasswordChange] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePasswordChange = () => {
    setPasswordChange(true);
    setDeleteAccount(false);
  };
  const handleDeleteAccount = () => {
    setDeleteAccount(true);
    setPasswordChange(false);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.BackendLink}/api/account/changePassword`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Password Changed Successfully");
        setCurrentPassword("");

        setNewPassword("");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    if (!checkBoxStatus) {
      toast.error("Please acknowledge by clicking the checkbox");
      return;
    }
    axios
      .post(
        `${import.meta.env.BackendLink}/api/account/deleteAccount`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Successfully Deleted the Account !");
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong on deleting the account !");
      });
  };
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div class="flex h-[80vh]">
        <div class="border-r text-neutral-content w-64 flex-shrink-0 hidden md:block">
          <div class="p-4 text-xl font-bold text-black border-b-2 flex items-center gap-2">
            <button
              className="btn text-2xl font-bold"
              onClick={() => {
                navigate("/home");
              }}
            >
              {String.fromCharCode(8592)}
            </button>
            <h1>Settings</h1>
          </div>
          <ul class="menu p-4 text-black">
            <li>
              <button onClick={handlePasswordChange}>Change Password</button>
            </li>
            <li>
              <a
                className="text-red-500 font-semibold"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </a>
            </li>
          </ul>
        </div>
        <div class="drawer md:hidden">
          <input id="mobile-sidebar" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex flex-col">
            <label
              for="mobile-sidebar"
              class="btn btn-neutral drawer-button m-4"
            >
              =
            </label>
          </div>
          <div class="drawer-side">
            <label for="mobile-sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 bg-neutral text-neutral-content w-64">
              <li>
                <button onClick={handlePasswordChange}>Change Password</button>
              </li>
              <li>
                <a
                  className="text-red-500 font-semibold"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
        </div>
        {!deleteAccount ? (
          <div class="flex-grow p-4 bg-base-100">
            <h1 class="text-2xl font-bold mb-4">Change Password</h1>
            <div className="flex flex-col w-[500px] p-[20px]">
              <form>
                <div className="form-control mb-2">
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <input
                    type={!showPassword ? "password" : "text"}
                    placeholder="Enter your current password"
                    className={`input input-bordered w-full ${
                      passwordError ? "input-error" : ""
                    }`}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                  <label className="label cursor-pointer w-[150px]">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="label ml-0 text-sm">Show Password</span>
                  </label>
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    type={!showPassword ? "password" : "text"}
                    placeholder="Enter your new password"
                    className={`input input-bordered w-full ${
                      passwordError ? "input-error" : ""
                    }`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  <label className="label cursor-pointer w-[150px]">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="label ml-0 text-sm">Show Password</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-neutral w-full"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </form>
              {/* <label>Current Password:</label>
              <input type="text" />

              <label>New Password:</label>
              <input type="text" /> */}
            </div>
          </div>
        ) : (
          <div class="flex-grow p-4 bg-base-100">
            <h1 class="text-2xl font-bold mb-4">Delete Account</h1>

            <div className="flex flex-col w-[500px] p-4 border-2">
              <h1 className="text-red-500 text-3xl font-semibold mb-4">
                Are you sure ?
              </h1>
              <p>
                All notes and data associated with your account will be
                permanently deleted. This action is irreversible, and your
                account cannot be recovered.
              </p>
              <label className="form-control flex flex-row gap-2 mt-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => setCheckBoxStatus(e.target.checked)}
                />
                <span className="label-text font-medium">
                  I acknowledge and accept the terms and conditions stated
                  above.
                </span>
              </label>
              <button
                className="btn btn-error w-[80px] text-white mt-4"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
