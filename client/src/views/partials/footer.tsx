import React from 'react';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button className="btn_back" onClick={() => navigate(-1)}>回上一頁</button>
        </div>
    );
}

export default Footer