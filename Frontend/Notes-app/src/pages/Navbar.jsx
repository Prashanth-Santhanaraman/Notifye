export default function Navbar() {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Notes</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/login" className="btn btn-ghost">Login</a>
            </li>
            <li>
              <a href="/signup" className="btn btn-ghost">Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
