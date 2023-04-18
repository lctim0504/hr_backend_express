export default interface ConfigProps {
    config: {
        "employee_id": number,
        "name": string,
        "department_id": string,
        "work_type": string,
        "work_type_id": string,
        "isAdmin": boolean,
    }
}

export interface Props {
    setConfig: (
        arg0: {
            employee_id: string;
            name: string;
            department_id: string;
            work_type: string,
            isAdmin: boolean;
        }) => void;
}

export interface InputRef {
    focus: () => void;
    value: string;
}

