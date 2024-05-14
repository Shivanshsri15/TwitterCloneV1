import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    userInfo ? navigate("/home") : navigate("/login");
  }, []);
  return (
    <>
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
