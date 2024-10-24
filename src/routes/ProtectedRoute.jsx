import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = useContext(authContext);
  const isAllowed = allowedRoles.includes(role);
  const accessibleRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  return accessibleRoute;
}

export default ProtectedRoute;