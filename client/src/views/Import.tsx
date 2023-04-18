import React from 'react';
import Header from './partials/header';
import Footer from './partials/footer';
import { useNavigate, useLocation } from "react-router-dom";
import ExcelRender from '../components/ExcelRender';
import { Button } from '@mui/material';

// interface HomeProps {
//     aboutContent: string;
// }
// : React.FC<HomeProps>
const Home = () => {
    // const location = useLocation();
    // console.log(location.state);
    return (
        <>
            <Header />
            <div className="container">
                <div className="one right">
                </div>
                <div className="two">
                    <h3><ExcelRender text={"匯入班表"} /></h3>
                    <Button variant="contained">上傳1</Button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;