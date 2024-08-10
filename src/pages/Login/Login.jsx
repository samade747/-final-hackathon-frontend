import { useState } from "react";
import { URL } from "../../Utils/url.js";
import {
  loginSuccess,
  loginFailure,
  loginStart,
} from "../../Redux/Slices/UserSlice.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: URL,
});


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  if (user) {
    return navigate("/");
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      api
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch(loginSuccess(res.data.data));
          toast.success(res.data.message);
          if (res.data.message === "Login Successful ✅") {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || err.message);
          dispatch(loginFailure());
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleClick}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
