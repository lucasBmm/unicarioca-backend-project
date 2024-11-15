import { Routes, Route } from 'react-router-dom';
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Vacancy from "../pages/vacancy/Vacancy";
import VacancyEnter from "../pages/vacancy-enter/VacancyEnter";
import VacancyRegister from "../pages/vacancy-register/VacancyRegister";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vacancy" element={<Vacancy />} />
        <Route path="/vacancy-register" element={<VacancyRegister />} />
        <Route path="/vacancy-enter" element={<VacancyEnter />} />
      </Routes>
    );
  };
   
  export default AppRoutes;