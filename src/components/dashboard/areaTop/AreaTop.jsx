import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import NewStudentModal from "../../../pages/Students/newStudentModal";
import NewTeacherModal from "../../../pages/Teacher/newTeacherModal";
import NewSlotsModal from "../../../pages/Slots/newSlotsModal";
import NewBatchModal from "../../../pages/Batche/newBatchtModal";
import { useSelector } from "react-redux";
import CoursesModal from "../../../pages/courses/Coursemodal";
import NewHolidayModal from "../../../pages/holiday/newHolidayModal";
// import NewHolidayModal from "../../../pages/holiday/newHolidayModal";
// import NewHolidayModal from "../../../pages/HolyDay/newSlotsModal";

const AreaTop = ({ title }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [teacherEditModal, setTeacherEditModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slotEditModal, setSlotEditModal] = useState(false);
  const [batchEditModal, setBatchEditModal] = useState(false);
  const [courseEditModal, setCourseEditModal] = useState(false);
  const [holidayEditModal, setHolidayEditModal] = useState(false); // State for NewHolidayModal

  // Handlers for modals
  const handleOpenEditModalBatch = () => setBatchEditModal(true);
  const handleCloseEditModalBatch = () => setBatchEditModal(false);

  const handleOpenEditModalSlots = () => setSlotEditModal(true);
  const handleCloseEditModalSlots = () => setSlotEditModal(false);

  const handleOpenEditModalTea = () => setTeacherEditModal(true);
  const handleCloseEditModalTea = () => setTeacherEditModal(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpencourseModal = () => setCourseEditModal(true);
  const handleClosecourseModal = () => setCourseEditModal(false);

  const handleOpenHolidayModal = () => setHolidayEditModal(true); // Open NewHolidayModal
  const handleCloseHolidayModal = () => setHolidayEditModal(false); // Close NewHolidayModal

  const Handleprint = () => {
    window.print();
  };

  const { openSidebar } = useContext(SidebarContext);
  const location = useLocation();

  const getPageName = (pathname) => {
    switch (pathname) {
      case "/signup":
        return "Signup";
      case "/login":
        return "Login";
      case "/otp":
        return "OTP Verification";
      case "/students":
        return "Students";
      case "/teachers":
        return "Teachers";
      case "/slots":
        return "Slots";
      case "/batches":
        return "Batches";
      case "/courses":
        return "Courses";
      case "/StudentPerfomence":
        return "Student Performance";
      case "/Viewattendence":
        return "View attendence";
      case "/holiDays":
        return "Holidays"; // Added holidays route
      default:
        return "Dashboard";
    }
  };

  const getButtons = (pathname) => {
    switch (pathname) {
      case "/":
      case "/signup":
      case "/login":
      case "/otp":
        return (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  const Addbutton = (pathname) => {
    switch (pathname) {
      case "/students":
        return <button onClick={handleOpenEditModal}>Add New Student</button>;
      case "/teachers":
        return (
          <button onClick={handleOpenEditModalTea}>Add New Teacher</button>
        );
      case "/holiday":
        return (
          <button onClick={handleOpenHolidayModal}>Add New Holiday</button>
        );
      case "/slots":
        return <button onClick={handleOpenEditModalSlots}>Add New Slot</button>;
      case "/batches":
        return (
          <button onClick={handleOpenEditModalBatch}>Add New Batch</button>
        );
      case "/StudentPerfomence":
        return (
          <Link to="/add-performance">
            <button>Add New Performance</button>
          </Link>
        );
      case "/Viewattendence":
        return (
          <Link>
            <button className="print-btn" onClick={Handleprint}>
              Print
            </button>
          </Link>
        );

      case "/courses":
        return <button onClick={handleOpencourseModal}>Add New Course</button>;
      case "/holidays":
        return (
          <button onClick={handleOpenHolidayModal}>Add New Holiday</button>
        ); // Added button for NewHolidayModal
      case "/holiDay":
        return (
          <button onClick={handleOpenHolidayModal}>Add New Holiday</button>
        ); // Added button for NewHolidayModal
      default:
        return null;
    }
  };

  return (
    <>
      <section className="content-area-top">
        <div className="area-top-l">
          <button
            className="sidebar-open-btn"
            type="button"
            onClick={openSidebar}
          >
            <MdOutlineMenu size={24} />
          </button>
          <h1>{getPageName(location.pathname) == "markAttendance" && title}</h1>
        </div>
        <div className="area-top-r">
          {!user ? getButtons(location.pathname) : null}
          {Addbutton(location.pathname)}
        </div>
      </section>

      {teacherEditModal && (
        <NewTeacherModal
          open={teacherEditModal}
          handleClose={handleCloseEditModalTea}
        />
      )}
      {showEditModal && (
        <NewStudentModal
          open={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
      {slotEditModal && (
        <NewSlotsModal
          open={slotEditModal}
          handleClose={handleCloseEditModalSlots}
        />
      )}
      {batchEditModal && (
        <NewBatchModal
          open={batchEditModal}
          handleClose={handleCloseEditModalBatch}
        />
      )}

      {courseEditModal && (
        <CoursesModal
          open={courseEditModal}
          handleClose={handleClosecourseModal}
        />
      )}

      {holidayEditModal && (
        <NewHolidayModal
          open={holidayEditModal}
          handleClose={handleCloseHolidayModal}
        />
      )}
    </>
  );
};

export default AreaTop;
