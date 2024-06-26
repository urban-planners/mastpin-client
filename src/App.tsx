import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DrawerRight from "./pages/Dashboard/components/Drawer/DrawerRight";
import { Login, Register } from "./pages/Home/Auth";
import Home from "./pages/Home";
import Landing from "./pages/Home/Landing";
import { Projects } from "./pages/Projects";
import { PublicMap } from "./pages/PublicMap";
import Privacy from "./pages/Legal/Privacy";
import Terms from "./pages/Legal/Terms";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Landing />} />
            <Route path="auth">
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="legal">
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
            </Route>
          </Route>
          <Route path="/dashboard">
            <Route index element={<Projects />} />
            <Route path=":id" element={<Dashboard />}>
              <Route index element={<DrawerRight />} />
            </Route>
          </Route>
          <Route path="/maps">
            <Route path=":publicId" element={<PublicMap />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
