import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Card, InputRef, Modal } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

interface FilterTableListProps {
    deleteUrl: string;
    getDataUrl: string;
    putUrl: string;
    pk: string;
}

const FilterTableList: React.FC<FilterTableListProps> = (props) => {

    interface DataType {
        key: string;
    }
    type DataIndex = keyof DataType;

    const [data, setData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    // const [loading, setLoading] = useState(false);
    const searchInput = useRef<InputRef>(null);
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(props.getDataUrl, { withCredentials: true })
            .then((response) => {
                const newData = response.data.map((item: any, index: number) => (
                    {
                        ...item,
                        key: item[props.pk]
                        // key: index
                    }));
                setData(newData);
            })
            .catch((error) => {
                //console.error(error);
            });
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        清除
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('123: ', selectedRows);

        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    interface MenuDictionary {
        [key: string]: number;
    }

    const defaultWidth = 100;
    const menuDict: MenuDictionary = {
        'password': 600,
        'email': 300,
    };
    const columns: ColumnsType<DataType> = data.length > 0 ?
        Object.keys(data[0])
            .filter(item => item !== 'key')
            .map((data: string) => {
                const width = data in menuDict ? menuDict[data] : defaultWidth;
                return {
                    title: data,
                    dataIndex: data,
                    key: data,
                    ellipsis: true,
                    width: data.includes('time') ? 225 : data.includes('_permit') ? 50 : width,
                    align: 'center',
                    ...getColumnSearchProps(data as DataIndex),
                };
            }) : [];


    const handleDeleteBtnClick = () => {
        const deleteData = { delete_ids: selectedRowKeys }
        console.log(deleteData);

        Modal.confirm({
            title: '確認刪除?',
            content: (
                <div>
                    {selectedRowKeys.map((item) => (
                        <div key={item}>{item}</div>
                    ))}
                </div>
            ),
            onOk: () => {
                axios
                    .delete(props.deleteUrl, { data: deleteData })
                    .then((response) => {
                        fetchData();
                        console.log('success');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onCancel: () => {
                console.log('cancel');
            },
        });

    };
    const handlePermitBtnClick = () => {
        const DataSeqs = { ids: selectedRowKeys }
        console.log(DataSeqs);

        Modal.confirm({
            title: '允許後將自動發信告知對應部門主管',
            onOk: () => {
                axios
                    .put(props.putUrl, { ids: DataSeqs, withCredentials: true })
                    .then((response) => {
                        fetchData();
                        console.log('success');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            onCancel: () => {
                console.log('cancel');
            },
        });

    };

    return (
        <Card title="查看與刪除" bordered={false} style={{ width: '100%' }}>
            <style> {`.ant-table-tbody { background-color: #dddddd;} `} </style>
            <Button
                type="primary" ghost
                onClick={handlePermitBtnClick}
                // disabled={!hasSelected}
                style={{ margin: '1%' }}
            >
                許可
            </Button>
            <Button
                danger
                onClick={handleDeleteBtnClick}
                // disabled={!hasSelected}
                style={{ margin: '1%' }}
            >
                刪除
            </Button>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 8,
                    // position: ['topRight'] 
                }}
            />

        </Card>
    );
};

export default FilterTableList;