import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formatDate } from "../utils/dateUtils";
import { useSelector } from "react-redux";
export default function Home() {
  const [userNotes, setUserNotes] = useState([]);
  const [addNotes, setAddNotes] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteNoteId, setDeleteNoteId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [editButton, setEditButton] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

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
        // toast.success("This is a success message!");
      })
      .catch((err) => console.error(err));
  }, []);
  // useEffect(() => {
  //   console.log("222")
  //   console.log(userNotes);
  // }, [userNotes]);

  const handleTitle = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title.trim().length === 0 && description.trim().length === 0){
      toast.error("Enter title and description")
      return
    }
    if(title.trim().length === 0){
      toast.error("Enter title")
      return
    }
    if(description.trim().length === 0){
      toast.error("Enter description")
      return
    }
    axios
      .post(
        "http://localhost:5000/api/notes/",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Added New Note !");
        setUserNotes((prevNotes) => [...prevNotes, res.data]);
        setAddNotes(!addNotes);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error in Adding New Note !");
      });
  };

  const handleDeleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Deleted the Note!");
          setUserNotes(userNotes.filter((note) => note._id !== id));
        }
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
        toast.error("Failed to delete the note!");
      });
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    if(editTitle.trim().length === 0 && editDescription.trim().length === 0){
      toast.error("Enter title and description")
      return
    }
    if(editTitle.trim().length === 0){
      toast.error("Enter Title")
      return
    }
    if(editDescription.trim().length === 0){
      toast.error("Enter Description")
      return
    }
    try {
      axios
        .patch(
          `http://localhost:5000/api/notes/${editId}`,
          {
            title: editTitle,
            description: editDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Updated the Note!");
          setAddNotes(!addNotes);
          setUserNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === editId ? { ...note, ...response.data } : note
            )
          );
        })
        .catch((error) => console.error(error));
    } catch (err) {}
  };

  const handleSearch = () => {
    console.log(searchValue);
    if (searchValue.trim().length === 0) {
      alert("enter any character to search");
      toast.error("Enter any character");
      return;
    }
    const filteredNotes = userNotes.filter((note) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUserNotes(filteredNotes);
  };
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div class="fixed bottom-7 right-7 flex items-center justify-center">
        <button
          className="btn btn-square btn-md btn-square"
          onClick={() => {
            setEditButton(false);
            setAddNotes(!addNotes);
          }}
        >
          +
        </button>
      </div>
      {!addNotes ? (
        <div className="join flex justify-center mt-4">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                placeholder="Search Notes"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="indicator">
            <button className="btn join-item" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="ml-2">
            <button className="btn join-item" onClick={handleSearch}>
              Reset Search
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {!addNotes ? (
        <div className="flex flex-wrap gap-4 p-[20px] mx-[20px] justify-center ">
          {userNotes.map((note) => (
            <div
              key={note._id}
              className="card border border-slate-950 w-80 rounded-md"
            >
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h1 className="card-title">{note.title}</h1>
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-square btn-sm">
                      ⋮
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow"
                    >
                      <li>
                        <button
                          onClick={() => {
                            setEditButton(true);
                            setAddNotes(!addNotes);
                            setEditId(note._id);
                            setEditTitle(note.title);
                            setEditDescription(note.description);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setDeleteNoteId(note._id);
                            handleDeleteNote(note._id);
                          }}
                          className="text-red-500"
                        >
                          Delete Note
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <p>{note.description}</p>
                <p className="text-xs mt-2 font-bold">
                  Created at: {formatDate(note.createdAt)}
                </p>
                {/* <p className="text-xs font-bold">Updated at: {formatDate(note.updatedAt)}</p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="card w-96 bg-white shadow-lg p-6">
            {!editButton ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-2xl pt-2">New Note</h2>
                  <button
                    className="btn btn-circle btn-sm btn-square flex"
                    onClick={() => setAddNotes(!addNotes)}
                  >
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
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
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
                      maxLength={350}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-neutral w-full"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-2xl pt-2">Edit Note</h2>
                  <button
                    className="btn btn-circle btn-sm btn-square flex"
                    onClick={() => setAddNotes(!addNotes)}
                  >
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
                      value={editTitle}
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                      }}
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
                      maxLength={350}
                      value={editDescription}
                      onChange={(e) => {
                        setEditDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-neutral w-full"
                    onClick={handleUpdateNote}
                  >
                    Update
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
