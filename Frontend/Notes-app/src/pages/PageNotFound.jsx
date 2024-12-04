import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-[80vh]">
        <h1 className="text-7xl text-red-400 font-bold">404</h1>
        <p className="text-3xl">Page not found !</p>

        <button className="btn btn-warning mt-6" onClick={handleReturn}>
          Return to Home
        </button>
      </div>
    </>
  );
}
