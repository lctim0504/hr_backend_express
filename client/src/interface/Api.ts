export interface LeaveData {
    employee_id: any;
    start_time: string;
    end_time: string;
    hours: number;
    leave_type_id: number;
    sub_name: string | null;
    reason: string;
}

export interface UpdatedRecord {
    sv_permit: boolean;
    permit_id: any;
}

export interface UpdateTimeRecord {
    act_start_time: boolean;
    act_end_time: any;
}


export interface OverTimeData {
    employee_id: any;
    start_time: string;
    end_time: string;
    hours: number;
    reason: string;
}

