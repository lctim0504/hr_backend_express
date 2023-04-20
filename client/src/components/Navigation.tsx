import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    const navigate = useNavigate();

    const [config] = useState(() => {
        const storedConfig = localStorage.getItem('config');
        return storedConfig ? JSON.parse(storedConfig) : {};
    });
    //傳入的值可直接用
    const { isAdmin, isSupervisor } = config;


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);

        switch (newValue) {
            case "Absence":
                navigate("/Absence", { state: "Absence" });
                break;
            case "Overtime":
                navigate("/Overtime", { state: "Overtime" });
                break;
            case "Approval":
                navigate("/Approval", { state: "Approval" });
                break;
            case "Control":
                navigate("/Control", { state: "Control" });
                break;
            // case "HRApproval":
            //     navigate("/HRApproval", { state: "HRApproval" });
            //     break;
            // case "Import":
            //     navigate("/Import", { state: "Import" });
            //     break;
            // case "Search":
            //     navigate("/Search", { state: "Search" });
            //     break;
        }
    };

    return (
        <BottomNavigation showLabels value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="請假"
                value="Absence"
                icon={<WorkHistoryOutlinedIcon />}
            />
            <BottomNavigationAction
                label="加班"
                value="Overtime"
                icon={<FavoriteIcon />}
            />
            {
                isSupervisor === true ?
                    <BottomNavigationAction
                        label="審核"
                        value="Approval"
                        icon={<ThumbUpAltIcon />}
                    /> : null
            }
            {
                isAdmin === true ?
                    <BottomNavigationAction
                        label="管理"
                        value="Control"
                        icon={<SupervisorAccountIcon />}
                    />
                    : null
            }
            {/* {
                isAdmin === true ?
                    <BottomNavigationAction
                        label="送簽"
                        value="HRApproval"
                        icon={<LocalPostOfficeIcon />}
                    />
                    : null
            }
            {
                isAdmin === true ?
                    <BottomNavigationAction
                        label="查詢"
                        value="Search"
                        icon={<ManageSearchIcon />}
                    />
                    : null
            } */}
        </BottomNavigation>
    );
}

export default LabelBottomNavigation;
