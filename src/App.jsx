import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import StudentList from "./pages/Students/StudentTable";
import TeacherList from "./pages/Teacher/TeacherTable";
import SlotsList from "./pages/Slots/SlotsTable";
import BatchList from "./pages/Batche/BatchTable";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Otp from "./pages/Otp/Otp.jsx";
import ViewStudent from "./pages/Students/ViewStudent.jsx";
import ViewSlot from "./pages/Slots/ViewSlot.jsx";
import ViewTeacher from "./pages/Teacher/ViewTeacher.jsx";
import ViewBatch from "./pages/Batche/ViewBatch.jsx";
import Viewattendence from "./pages/viewattendence/Viewattendence.jsx";
import Mark from "./pages/Mark/Mark.jsx";
import CourseList from "./pages/courses/coursestable.jsx";
// import HoliDaysList from "./pages/HolyDay/HolidayTable.jsx";
// import HoliDaysList from "./pages/holiday/HolidayTable.jsx"
import HoliDaysList from "./pages/holiday/HolidayTable.jsx";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "./Redux/Slices/UserSlice.jsx";
import axios from "axios";
import { URL } from "./Utils/url.js";
import styled from "styled-components";

const api = axios.create({
  baseURL: URL,
});

// import BatchList from "./pages/Batche/BatchTable";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  // check if the user is logged in
  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        dispatch(loginFailure());
        console.log("no token");
        return;
      }

      dispatch(loginStart());

      try {
        const res = await api.get("/auth/isuserloggedin", {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.data) {
          console.log(res.data);
          dispatch(loginSuccess(res.data.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(loginFailure(error));
      }
    };

    setTimeout(() => {
      isUserLoggedIn();
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <img src="/public/loder.gif" alt="LinkedIn Logo" />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/slots" element={<SlotsList />} />
            <Route path="/batches" element={<BatchList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Otp" element={<Otp />} />
            <Route path="/StudentProfile" element={<ViewStudent />} />
            <Route path="/viewteacher" element={<ViewTeacher />} />
            <Route path="/viewslot" element={<ViewSlot />} />
            <Route path="/TeacherProfile" element={<ViewTeacher />} />
            <Route path="/viewbatch" element={<ViewBatch />} />
            <Route path="/viewattendence" element={<Viewattendence />} />
            <Route path="/markAttendence" element={<Mark />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/holiDay" element={<HoliDaysList />} />
            {/* <Route path="/viewteacher" element={<ViewTeacher />} />
            <Route path="/viewslot" element={<ViewSlot />} />
            <Route path="/TeacherProfile" element={<ViewTeacher />} />
            <Route path="/viewattendence" element={<Viewattendence />} />
            <Route path="/markAttendence" element={<Mark />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/holiDay" element={<HoliDaysList />} /> */}
            <Route path="/holiDays" element={<HoliDaysList />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  img {
    width: 380px;
    object-fit: contain;
  }
`;
export default App;
