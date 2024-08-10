import "./otp.css";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/Slices/UserSlice.jsx";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AreaTop from "../../components/dashboard/areaTop/AreaTop.jsx";
// import { AreaTop } from "../../components";

const api = axios.create({
  baseURL: URL,
});

const Otp = () => {
  const user = useSelector((state) => state.user.currentUser);
  // if (user) {
  //   return navigate("/");

  // }
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signedupUser = useSelector(
    (state) => state.SignupUserSlice.currentUser
  );
  console.log(signedupUser);

  const handleClick = async (e) => {
    e.preventDefault();

    api
      .post(
        "/auth/verifyEmail",
        {
          otp: otp,
          user: signedupUser?.data ? signedupUser.data : "",
        },
        {
          headers: {
            authorization: `Bearer ${signedupUser?.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        toast.success(res.data.message);
        dispatch(loginSuccess(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));

        if (res.data.message === "Email Verified Successfully ✅") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message);
      });
  };

  return (
    <>
      <div className="otpmain">
        <form className="otp" onSubmit={handleClick}>
          <h1 className="otpTitle">OTP VERIFICATION</h1>
          <input
            type="text"
            className="otpInput"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter otp"
          />
          <button className="otpBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Otp;
