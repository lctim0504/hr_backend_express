export interface AbsenceDataType {
    name: string;
    key: React.Key;
    seq: string;
    employee_id: string;
    employee_data: {
        name: string;
    };
    leave_date: string;
    start_time: string;
    end_time: string;
    hours: number;
    leave_type_id: string;
    substitute: string;
    reason: string;
    hr_permit: boolean;
    sv_permit: boolean;
}

export interface AbsenceOption {
    [x: string]: any;
    id: number;
    name: string;
}

export interface PersonName {
    text: string;
    value: string;
}