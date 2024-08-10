import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import HolidayModal from "./HoliDayModal.jsx";

const api = axios.create({
  baseURL: URL,
});

const HolidayTableAction = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const deleteHoliday = async () => {
    try {
      const response = await api.delete(`/holiday/delete/${data._id}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
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
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item" onClick={deleteHoliday}>
                <Link className="dropdown-menu-link">Delete</Link>
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditModal && (
        <HolidayModal
          data={data}
          open={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default HolidayTableAction;
