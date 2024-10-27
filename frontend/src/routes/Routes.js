import { Routes, Route } from 'react-router-dom';
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Vacancy from "../pages/vacancy/Vacancy";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vacancy" element={<Vacancy />} />
      </Routes>
    );
  };
   
  export default AppRoutes;