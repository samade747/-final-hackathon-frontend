// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import Dashboard from './components/Dashboard/Dashboard';
// import Attendance from './components/Dashboard/Attendance';
// import Navbar from './components/Layout/Navbar';
// import PrivateRoute from './components/PrivateRoute';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Attendance from './components/Dashboard/Attendance';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
