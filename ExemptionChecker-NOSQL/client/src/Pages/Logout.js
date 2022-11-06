import React from "react";
import { useNavigate } from "react-router";
export default function Logout({ logout }) {
    logout();
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate("/");
    })
};