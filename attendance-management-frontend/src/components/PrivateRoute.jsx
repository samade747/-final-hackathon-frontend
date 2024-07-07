// // src/components/PrivateRoute.jsx
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const auth = useSelector(state => state.auth);

//   return auth.isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  // Temporary bypass authentication
  // const auth = useSelector(state => state.auth);
  // return auth.isAuthenticated ? children : <Navigate to="/login" />;
  
  // Temporarily allow all users to access the dashboard
  return children;
};

export default PrivateRoute;
