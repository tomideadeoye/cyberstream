import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layouts/navbar";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:imdbId" element={<Details />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
