import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import ChildModal from "./StudentModal";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

const StudentTableAction = ({ student }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const navigate = useNavigate();

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const dropdownRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSingleStudent = async () => {
    try {
      const res = await api.get(`/student/${student._id}`);
      console.log("Fetched student data: ", res.data.data);

      // Navigate to the StudentProfileView component with the fetched student data
      navigate("/StudentProfile", { state: { student: res.data.data } });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async () => {
    try {
      const res = await api.delete(`/student/delete/${student._id}`);
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <button
                  className="dropdown-menu-link"
                  onClick={fetchSingleStudent}
                >
                  View
                </button>
              </li>
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item" onClick={deleteStudent}>
                Delete
              </li>
            </ul>
          </div>
        )}
      </button>

      {showEditModal && (
        <ChildModal open={showEditModal} handleClose={handleCloseEditModal} student={student} />
      )}
    </>
  );
};

export default StudentTableAction;
