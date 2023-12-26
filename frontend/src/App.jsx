import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
