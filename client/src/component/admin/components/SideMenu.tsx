import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import type { Key } from 'antd/lib/table/interface';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('帳號相關', 'sub1', <MailOutlined />, [
        getItem('新增/刪除 帳號', '1'),
        //getItem('查看全部帳號', '6'),
        // getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        // getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('使用者相關', 'sub2', <AppstoreOutlined />, [
        getItem('新增/刪除 使用者', '2'),
        // getItem('Option 6', '6'),
        // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    { type: 'divider' },

    getItem('請假相關', 'sub3', <SettingOutlined />, [
        getItem('審核請假紀錄', '3'),
        // getItem('查看請假紀錄', '10'),
        // getItem('Option 11', '11'),
        // getItem('Option 12', '12'),
    ]),

    getItem('加班相關', 'sub4', <SettingOutlined />, [
        getItem('審核加班紀錄', '4'),
        // getItem('查看加班紀錄', '12'),
    ]),
    getItem('其他', 'grp', null, [
        getItem('上傳班表', '5'),
        // getItem('Option 14', '14')
    ], 'group'),
];

interface SideMenuProps {
    setMenuItem: (key: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
    const onClick: MenuProps['onClick'] = (e) => {
        //console.log('click ', e);
        props.setMenuItem(e.key.toString());
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['sub3']}
            defaultOpenKeys={['sub3']}
            mode="inline"
            items={items}
        />
    );
};

export default SideMenu;