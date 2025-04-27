import React from 'react'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ authentication = true, children }) => {

    const token = localStorage.getItem("token")

    return token ? children : <Navigate to="/sign-in" />;

};

export default UserProtectedRoute