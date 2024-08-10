import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
} from "react-icons/md";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";

import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHanlder = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <div className="sidebar-brand">
            <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />

            <span className="sidebar-brand-text">Attendance Portal</span>
          </div>
        </Link>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            {user?.Role === "admin" && (
              <>
                <li className="menu-item">
                  <Link to="/students" className="menu-link">
                    <span className="menu-link-icon">
                      <SchoolIcon size={20} />
                    </span>
                    <span className="menu-link-text">Students</span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to="/courses" className="menu-link">
                    <span className="menu-link-icon">
                      <PersonIcon size={20} />
                    </span>
                    <span className="menu-link-text">Courses </span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to="/teachers" className="menu-link">
                    <span className="menu-link-icon">
                      <PersonIcon size={20} />
                    </span>
                    <span className="menu-link-text">Teachers </span>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/slots" className="menu-link">
                    <span className="menu-link-icon">
                      <AccessTimeIcon size={18} />
                    </span>
                    <span className="menu-link-text">Slots </span>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/batches" className="menu-link">
                    <span className="menu-link-icon">
                      <GroupIcon size={20} />
                    </span>
                    <span className="menu-link-text">Batches </span>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/Viewattendence" className="menu-link">
                    <span className="menu-link-icon">
                      <VisibilityIcon size={20} />
                    </span>
                    <span className="menu-link-text">View Attendance</span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to="/markAttendence" className="menu-link">
                    <span className="menu-link-icon">
                      <CheckCircleIcon size={18} />
                    </span>
                    <span className="menu-link-text">Mark Attendance</span>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/holiDay" className="menu-link">
                    <span className="menu-link-icon">
                      <EventIcon size={18} />
                    </span>
                    <span className="menu-link-text">HoliDay</span>
                  </Link>
                </li>
              </>
            )}

            {!user?.Role === "teacher" && (
              <li className="menu-item">
                <Link to="/Viewattendence" className="menu-link">
                  <span className="menu-link-icon">
                    <VisibilityIcon size={20} />
                  </span>
                  <span className="menu-link-text">View Attendance</span>
                </Link>
              </li>
            )}
            {user?.Role === "student" && (
              <li className="menu-item">
                <Link to="/markAttendence" className="menu-link">
                  <span className="menu-link-icon">
                    <CheckCircleIcon size={18} />
                  </span>
                  <span className="menu-link-text">View Attendance</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item" onClick={logoutHanlder}>
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
