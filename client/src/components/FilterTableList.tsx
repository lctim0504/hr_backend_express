import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Card, DatePicker, InputRef, Modal, message } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import { DataType, FilterTableListProps, MenuDictionary } from '../interface/Components';
import { ExportGetLeave, ExportGetOvertime } from '../app/ExportApi';
import CheckIcon from '@mui/icons-material/Check';

const FilterTableList: React.FC<FilterTableListProps> = (props) => {


    type DataIndex = keyof DataType;

    const [data, setData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const selectedMonthRef = useRef('');

    // const [loading, setLoading] = useState(false);
    const searchInput = useRef<InputRef>(null);
    const hasSelected = selectedRowKeys.length > 0;
    const [noButton,] = useState(props.pk === 'noButton');

    useEffect(() => {
        fetchData();
    }, []);

    //時間格式化
    const formatDateTime = (dateTimeString: string): string => {
        return new Date(dateTimeString).toLocaleString("zh-TW", {
            hour12: false,
        });
    }

    //改table資料
    const fetchData = () => {
        axios
            .get(props.getDataUrl, { withCredentials: true })
            .then((response) => {
                const newData = response.data.map((item: any, index: number) => {
                    const newItem = {
                        ...item,
                        key: item[props.pk],
                    };

                    if (newItem.hasOwnProperty('isAdmin')) {
                        newItem.isAdmin = newItem.isAdmin ? <CheckIcon className='icon-green' /> : "";
                    }
                    if (newItem.hasOwnProperty('isSupervisor')) {
                        newItem.isSupervisor = newItem.isSupervisor ? <CheckIcon className='icon-green' /> : "";
                    }
                    if (newItem.hasOwnProperty('sv_permit')) {
                        newItem.sv_permit = newItem.sv_permit ? <CheckIcon className='icon-green' /> : "";
                    }
                    if (newItem.hasOwnProperty('permit_time')) {
                        newItem.permit_time = formatDateTime(item.permit_time);
                    }
                    if (newItem.hasOwnProperty('create_time')) {
                        newItem.create_time = formatDateTime(item.create_time);
                    }
                    return newItem;
                });

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
        setSelectedRows(selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const menuDict: MenuDictionary = {
        'password': 600,
        'email': 300,
    };

    const columns: ColumnsType<DataType> = data.length > 0 ?
        Object.keys(data[0])
            .filter(item => item !== 'key')
            .map((data: string) => {
                return {
                    title: data,
                    dataIndex: data,
                    key: data,
                    ellipsis: true,
                    align: 'center',
                    ...getColumnSearchProps(data as DataIndex),
                };
            }) : [];


    const handleDeleteBtnClick = () => {
        const deleteData = { ids: selectedRowKeys }
        let isCheck = false;
        selectedRows.map((item) => {
            //用圖案判斷，這裡是icon-green，改了要一起改
            if (item.sv_permit && item.sv_permit.props && item.sv_permit.props.className === 'icon-green') {
                isCheck = true;
            }
        })
        if (!isCheck) {
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
                    const ids = props.pk === "seq" ? deleteData.ids.join('&seq=') : deleteData.ids.join('&id=');
                    axios
                        .delete(props.deleteUrl + ids, { withCredentials: true })
                        .then(() => {
                            fetchData();
                            message.success("已刪除");
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
            });
        }
        else {
            message.error("主管已確認不可刪除!");
        }


    };
    const handlePermitBtnClick = () => {
        //篩出有hr_permit的資料 or 有sv_permit資料
        let filteredDataSeqs = {};
        selectedRows.map((item) => {
            if ((item.hr_permit && item.hr_permit.props && item.hr_permit.props.className === 'icon-green') ||
                (item.sv_permit && item.sv_permit.props && item.sv_permit.props.className === 'icon-green')) {
                filteredDataSeqs = {
                    ...filteredDataSeqs,
                    [item.seq]: true
                }
            }
        })
        const filteredSeqsArray = Object.keys(filteredDataSeqs).map(seq => Number(seq));
        //選取資料刪掉已有permit的資料，代入自動發信
        const filteredArr = selectedRowKeys.filter(item => !filteredSeqsArray.includes(Number(item)));
        const DataSeqs = { ids: filteredArr }
        console.log("發送的seq:" + DataSeqs);

        Modal.confirm({
            title: '允許後將自動發信告知對應部門主管',
            onOk: () => {
                const seq = DataSeqs.ids.join('&seq=');
                axios
                    .put(props.putUrl + seq, { hr_permit: true }, { withCredentials: true })
                    .then(() => {
                        fetchData();
                        message.success("成功同意");
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

    const handleExportBtnClick = () => {
        try {
            const { confirm } = Modal;
            const result = confirm({
                title: '選擇匯出月份',
                content: (
                    <div>
                        <DatePicker picker="month" onChange={(value, dateString) => {
                            selectedMonthRef.current = dateString
                        }} />
                    </div>
                ),
                onOk: () => {
                    console.log('選擇的月份是：', selectedMonthRef.current);
                    console.log(props.getDataUrl);
                    //匯出excel
                    props.getDataUrl === "http://localhost:5000/leave/" ? ExportGetLeave() : ExportGetOvertime();
                },
            });
        } catch (error) {
            console.error(error);
        }
    };
    return noButton ?
        <div>
            <Card
                title="查看"
                bordered={false}
                style={{ width: "100%" }}
            >
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: true }}
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: false,
                        // position: ['topRight'] 
                    }}
                />
            </Card>
        </div>
        : (
            <div>
                <Card
                    title="查看與刪除"
                    bordered={false}
                >
                    {
                        props.pk === "seq" ?
                            <Button
                                type="primary"
                                ghost
                                onClick={handlePermitBtnClick}
                                // disabled={!hasSelected}
                                style={{ margin: "1%" }}
                            >
                                許可
                            </Button> : null
                    }

                    <Button
                        danger
                        onClick={handleDeleteBtnClick}
                        // disabled={!hasSelected}
                        style={{ margin: "1%" }}
                    >
                        刪除
                    </Button>
                    {
                        props.pk === "seq" ?
                            <Button
                                className='btn-green'
                                onClick={handleExportBtnClick}
                                // disabled={!hasSelected}
                                style={{ margin: "1%" }}
                            >
                                匯出
                            </Button> : null
                    }
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: true }}
                        pagination={{
                            pageSize: 8,
                            showSizeChanger: false,
                            // position: ['topRight'] 
                        }}
                    />
                </Card>
            </div>
        );
}

    ;

export default FilterTableList;