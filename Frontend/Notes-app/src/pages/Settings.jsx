import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { useState } from "react";

export default function Settings() {
  const [passwordChange, setPasswordChange] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();
  const handlePasswordChange = () => {
    setPasswordChange(true);
    setDeleteAccount(false);
  };
  const handleDeleteAccount = () => {
    setDeleteAccount(true);
    setPasswordChange(false);
  };
  return (
    <>
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
        {/* <div class="drawer md:hidden">
    <input id="mobile-sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <label for="mobile-sidebar" class="btn btn-neutral drawer-button m-4">Menu</label>

      <div class="flex-grow p-4">Main Content</div>
    </div>
    <div class="drawer-side">
      <label for="mobile-sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 bg-neutral text-neutral-content w-64">
        <li><a>Dashboard</a></li>
        <li><a>Profile</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div> */}
        {!deleteAccount ? (
          <div class="flex-grow p-4 bg-base-100">
            <h1 class="text-2xl font-bold mb-4">Change Password</h1>
            <p>
              Welcome to the sidebar layout example. Use this space for your
              main content.
            </p>
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
                <input type="checkbox" className="checkbox" />
                <span className="label-text font-medium">
                I acknowledge and accept the terms and conditions stated above.
                </span>
              </label>
              <button className="btn btn-error w-[80px] text-white mt-4">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
