import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../Redux/Slices/SignupUserSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Link } from "react-router-dom";
import "./signup.scss";
import { useSelector } from "react-redux";

const Signup = () => {
  const user = useSelector((state) => state.user.currentUser);
  if (user) {
    return navigate("/");
  }
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);



  const api = axios.create({
    baseURL: URL,
  });
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    if (role && email && password) {
      if (password.length < 7) {
        toast.error("Password must be at least 7 characters 🔒");
        return;
      }
      // create user obj
      const data = {
        email,
        password,
        role,
      };

      // signup start
      dispatch(signupStart());

      // hit an api
      await api
        .post("/auth/signup", data)
        .then((res) => {
          // checking response
          console.log(res.data);

          // signup success
          dispatch(signupSuccess(res.data));

          // set message
          toast.success(res.data.message);

          // navigate to otp
          if (res.data.message === "User Registartion Successfull") {
            navigate("/otp");
          }
        })
        .catch((err) => {
          dispatch(signupFailure());
          toast.error(err.response.data.message);
          console.log(err);
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>
        <form onSubmit={signup}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              required
              className="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
