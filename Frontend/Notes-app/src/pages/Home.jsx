import axios from "axios";
import { useEffect } from "react";
export default function Home() {
    const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  },[]);
  return <></>;
}
