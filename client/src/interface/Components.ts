import { FormInstance } from 'antd';

export interface DepartmentModalProps {
    form: FormInstance;
    setIsSV: (key: boolean) => void;
    svChk: boolean;
}

export interface ExcelData {
    [key: string]: string | number;
}

export interface MultilineTextFieldsProps {
    rows: number;
    onChange: (value: string) => void;
    value: string;
}

interface TableData {
    seq: React.Key | null | undefined;
    employee_id: string | number | null | undefined;
    start_time: string | number | null | undefined;
    end_time: string | number | null | undefined;
    create_time: string | number | null | undefined;
    hours: string | number | null | undefined;
    sv_permit: boolean | null | undefined;
}

export interface Props {
    tableHead: string[];
    data: TableData[];
    handleDialogClick: (seq: React.Key | null | undefined) => void;
}

export interface SideMenuProps {
    setMenuItem: (key: string) => void;
}

export interface OptionType {
    value: string;
}

export interface ComponentDemoProps {
    options: OptionType[];
    onChange: (newValue: string | null) => void;
}

export interface FilterTableListProps {
    deleteUrl: string;
    getDataUrl: string;
    putUrl: string;
    pk: string;
}

export interface DataType {
    seq: any;
    hr_permit: any;
    sv_permit: any;
    key: string;
}

export interface MenuDictionary {
    [key: string]: number;
}

export interface MyMessageProps {
    onInfoClick?: () => void;
}

export interface ScheduleOverTimeProps {
    workingDay: Array<string>;
    overTimeData: Array<string>;
}

export interface ScheduleProps {
    workingDay: Array<string>;
    leaveData: Array<string>;
}