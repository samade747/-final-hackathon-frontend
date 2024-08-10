import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import Teacher from "./TeacherModal.jsx";
import ViewTeacher from "./ViewTeacher.jsx";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

const TeacherTableAction = ({ dataItem }) => {
  console.log(dataItem);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchSingleTeacher = async () => {
    try {
      const res = await api.get(`/teacher/${dataItem._id}`);
      console.log("Fetched teacher data: ", res.data.data);

      navigate("/viewteacher", { state: { teacher: res.data.data } });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTeacher = async () => {
    try {
      const res = await api.delete(`/teacher/delete/${dataItem._id}`);
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <Link
                  to="/TeacherProfile"
                  state={{ teacher: dataItem }}
                  className="dropdown-menu-link"
                >
                  View
                </Link>
              </li>
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item" onClick={deleteTeacher}>
                Delete
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditModal && (
        <Teacher
          open={showEditModal}
          handleClose={handleCloseEditModal}
          dataItem={dataItem}
        />
      )}
    </>
  );
};

export default TeacherTableAction;
