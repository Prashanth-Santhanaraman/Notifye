import { useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

    // <>
    // <Navbar />
    // <Login />
    // </>
  );
}

export default App;
