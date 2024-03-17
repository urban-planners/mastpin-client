import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DrawerRight from "./pages/Dashboard/components/Drawer/DrawerRight";
import { Login, Signup } from "./pages/Home/Auth";
import Home from "./pages/Home";
import Landing from "./pages/Home/Landing";
import { Projects } from "./pages/Projects";

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
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>
          <Route path="/dashboard">
            <Route index element={<Projects />} />
            <Route path=":id" element={<Dashboard />}>
              <Route index element={<DrawerRight />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
