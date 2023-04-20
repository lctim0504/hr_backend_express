import React, { useEffect, useState } from 'react';
import FilterTableList from '../components/FilterTableList';
import SideMenu from '../components/SideMenu';
import EmployeeForm from '../components/Employee';
import AccountData from '../components/AccountData';
import UpdateManager from '../components/UpdateManager';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import Footer from './partials/footer';
import Header from './partials/header';
import { MenuDictionary } from '../interface/AdminPage';
import "../scss/AdminPage.scss";
import { AuthGetAll } from '../app/AuthApi';
import { urlString } from '../app/Request';
import UploadSchedule from '../components/UploadSchedule';


const AdminPage = () => {
    const [menuItem, setMenuItem] = useState('3');
    const [keyCount, setKeyCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        AuthGetAll()
            .catch((error) => {
                if (error.status === 401 || error.status === 403)
                    navigate('/Absence');
            });
    }, []);

    const menuDict: MenuDictionary = {
        '1': {
            getDataUrl: urlString + '/auth/',
            pk: 'account',
            deleteUrl: urlString + '/auth/accounts?id=',
            putUrl: '/auth/',
            Form: UpdateManager,
        },
        '2': {
            getDataUrl: urlString + '/user/',
            pk: 'employee_id',
            deleteUrl: urlString + '/user/',
            putUrl: '',
            Form: EmployeeForm,
        },
        '3': {
            getDataUrl: urlString + '/leave/',
            pk: 'seq',
            deleteUrl: urlString + '/leave/records?seq=',
            putUrl: urlString + '/leave/records?seq=',
            Form: AccountData,
        },
        '4': {
            getDataUrl: urlString + '/overtime/',
            pk: 'seq',
            deleteUrl: urlString + '/overtime/records?seq=',
            putUrl: urlString + '/overtime/records?seq=',
            Form: AccountData,
        },
        '5': {
            getDataUrl: urlString + '/schedule/',
            pk: 'noButton',
            deleteUrl: urlString + '/schedule/',
            putUrl: '',
            Form: UploadSchedule,
        },
    };
    const menuParams = menuDict[menuItem];

    useEffect(() => {
        setKeyCount(keyCount + 1);
    }, [menuItem]);

    const Formcomponents = menuParams.Form; // 取得對應 menuItem 的 Form 組件

    return (
        <>
            <Header />
            <div className="container2">
                <div className="one">
                    <SideMenu setMenuItem={setMenuItem} />
                </div>
                <div className="five">
                    <div className="direction-column">
                        <Formcomponents />
                        {/* <AdminSubForm Formcomponents={Formcomponents} /> */}
                        <Divider style={{ border: '0.5px dashed lightgray' }} />
                        <FilterTableList key={keyCount} {...menuParams} />

                    </div>
                </div>
            </div>

            <Divider style={{ border: '0.5px dashed lightgray' }} />

            <div className="container2">
            </div>

            <Footer />

        </>
    );
};


export default AdminPage;
