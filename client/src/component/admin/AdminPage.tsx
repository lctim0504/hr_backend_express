import React, { useEffect, useState } from 'react';
import { ColumnContainer, Left, Mid, PageContainer, Right, RightBottom, RightTop, SectionGroup } from './styled';
import FilterTableList from './components/FilterTableList';
import SideMenu from './components/SideMenu';
import EmployeeForm from './components/Employee';
import { Divider } from 'antd';
import AccountData from './components/AccountData';
import DataChangeForm from './components/DeleteUser';
import UpdateManager from './components/UpdateManager';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [menuItem, setMenuItem] = useState('3');
    const [keyCount, setKeyCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/auth/check', { withCredentials: true })
            .then(response => {
            })
            .catch(error => {
                if (error.response.status === 401 || error.response.status === 403)
                    navigate('/login');
            });
    }, []);


    interface MenuDictionary {
        [key: string]: {
            getDataUrl: string;
            pk: string;
            deleteUrl: string;
            putUrl: string;
            Form: React.FC<any>; // 新增一個 Form 的屬性
        };
    }

    const menuDict: MenuDictionary = {
        '1': {
            getDataUrl: 'http://localhost:5000/auth/',
            pk: 'account',
            deleteUrl: 'http://localhost:5000/auth/',
            putUrl: '',
            Form: AccountData,
        },
        '2': {
            getDataUrl: 'http://localhost:5000/user/',
            pk: 'employee_id',
            deleteUrl: 'http://localhost:5000/user/',
            putUrl: '',
            Form: EmployeeForm,
        },
        '3': {
            getDataUrl: 'http://localhost:5000/leave/',
            pk: 'seq',
            deleteUrl: 'http://localhost:5000/leave/',
            putUrl: 'http://localhost:5000/leave/',
            Form: AccountData,
        },
        '4': {
            getDataUrl: 'http://localhost:5000/???/',
            pk: 'employee_id',
            deleteUrl: 'http://localhost:5000/???/',
            putUrl: '',
            Form: UpdateManager,
        },
    };
    const menuParams = menuDict[menuItem];

    useEffect(() => {
        setKeyCount(keyCount + 1);
    }, [menuItem]);

    const FormComponent = menuParams.Form; // 取得對應 menuItem 的 Form 組件

    return (
        <PageContainer>
            <ColumnContainer></ColumnContainer>
            <SectionGroup>
                <Mid>
                    <Left>
                        <SideMenu setMenuItem={setMenuItem} />
                    </Left>
                    <Right>
                        <RightTop>
                            <FormComponent /> {/* 呈現 Form 組件 */}
                        </RightTop>
                        <Divider style={{ border: '0.5px dashed lightgray' }} />
                        <RightBottom>
                            <FilterTableList key={keyCount} {...menuParams} />
                        </RightBottom>
                    </Right>
                </Mid>
            </SectionGroup>
        </PageContainer>
    );
};


export default AdminPage;
