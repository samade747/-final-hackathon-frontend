import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import SlotsModal from "./SlotsModal";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

const SlotsTableAction = ({ data }) => {
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

  const deleteSlot = async () => {
    try {
      const response = await api.delete(`/slot/delete/${data._id}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleSlot = async () => {
    try {
      const res = await api.get(`/slot/${data._id}`);
      console.log("Fetched slot data: ", res.data.data);

      navigate("/viewslot", { state: { slot: res.data.data } });
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
                  onClick={fetchSingleSlot}
                >
                  View
                </button>
              </li>
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item">
                <Link className="dropdown-menu-link" onClick={deleteSlot}>
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditModal && (
        <SlotsModal
          data={data}
          open={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default SlotsTableAction;
