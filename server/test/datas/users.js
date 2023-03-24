export const test_user_id = '1110099'
export const impossible_id = '9999999'

export const create_user_data = {
    employee_id: '1110099',
    name: 'Tim99',
    department_id: 'ITS001',
    work_type_id: '1-1',
    isAdmin: false
}

export const update_user_data = {
    name: 'update_Tim2',
    department_id: 'ITS001',
    work_type_id: '1-1',
    isAdmin: false
}

export const missing_user_data = {
    // 缺少 employee_id, name, department_id, work_type_id 等必填欄位
    isAdmin: false
}

export const errorformat_user_data = {
    employee_id: '1110099',
    name: 'Tim99',
    department_id: 'ITS001',
    work_type_id: '1-1',
    isAdmin: 'not boolean' // isAdmin 應該是布林值
}

