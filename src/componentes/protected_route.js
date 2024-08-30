import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
    const location = useLocation();
    const token = sessionStorage.getItem('authToken');
    
    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    
    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.rol_user;
        
        if (requiredRole && userRole !== requiredRole) {
            return <Navigate to="/" />;
        }
        return children;
    } catch (error) {
        
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
