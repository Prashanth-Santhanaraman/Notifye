import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [userNotes, setUserNotes] = useState([]);
  const [addNotes, setAddNotes] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUserNotes(res.data.notes);
      })
      .catch((err) => console.error(err));
  }, []);
  // useEffect(() => {
  //   console.log("222")
  //   console.log(userNotes);
  // }, [userNotes]);
  return (
    <>
      <div class="fixed bottom-7 right-7 flex items-center justify-center">
        <button
          className="btn btn-square btn-lg btn-neutral"
          onClick={() => setAddNotes(!addNotes)}
        >
          +
        </button>
      </div>
      {!addNotes ? (
        <div className="flex flex-wrap gap-4 p-5">
          {userNotes.map((note) => (
            <div key={note.id} className="card bg-purple-200 w-96 shadow-md">
              <div className="card-body">
                <h1 className="card-title">
                  {note.title}{" "}
                  <details className="dropdown">
                    <summary className="btn">:</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li>
                        <a>Edit</a>
                      </li>
                      <li>
                        <a>Delete note</a>
                      </li>
                    </ul>
                  </details>
                </h1>
                <p>{note.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="card w-96 bg-white shadow-lg p-6">
            <div className="flex items-center justify-end">
              <button className="btn btn-circle btn-sm btn-neutral flex" onClick={() => setAddNotes(!addNotes)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the title"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Enter the description"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-neutral w-full">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
