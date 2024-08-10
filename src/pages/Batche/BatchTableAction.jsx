import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BatchModal from "./BatxhModal";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});
const SlotsTableAction = ({ dataItem }) => {
  const navigate = useNavigate();
  console.log(dataItem);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const HandleDelete = async () => {
    try {
      await api.delete(`/batch/delete/${dataItem._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchSingleBatch = async () => {
    try {
      const res = await api.get(`/batch/${dataItem._id}`);
      console.log("Fetched batch data: ", res.data.data);

      navigate("/viewbatch", { state: { batch: res.data.data } });
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
              <li className="dropdown-menu-item" onClick={fetchSingleBatch}>
                <button className="btn">View</button>
              </li>
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                <button className="btn">Edit</button>
              </li>
              <li className="dropdown-menu-item">
                <button className="btn" onClick={HandleDelete}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditModal && (
        <BatchModal
          open={showEditModal}
          handleClose={handleCloseEditModal}
          dataItem={dataItem}
        />
      )}
    </>
  );
};

export default SlotsTableAction;
