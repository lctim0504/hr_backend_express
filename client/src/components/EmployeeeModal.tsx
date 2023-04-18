import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormInstance, Input, Modal } from 'antd';
import axios from 'axios';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemDepartments } from '../app/ItemApi';
import { DepartmentModalProps } from '../interface/Components';

const DepartmentModal: React.FC<DepartmentModalProps> = (props) => {
  const [departments, setDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);

  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    ItemDepartments()
      .then((response) => setDepartments(response))
  }, []);

  const handleButtonClick = (department_id: string) => {
    setDepartmentId(department_id)
    setIsModalVisible(false)
    props.form.setFieldsValue({ department_id });
  };

  const renderDepartmentButtons = () => {
    return departments.map((department: any) => (
      <div key={department.id}>
        <Button style={{ width: '100%' }} onClick={() => handleButtonClick(department.id)}>
          {department.name}({department.id})
        </Button>
      </div>
    ));
  };

  const handleEmployeeBtnClick = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input style={{ display: 'flex' }} value={departmentId} />
        <Button style={{ display: 'flex' }} onClick={handleEmployeeBtnClick}>選擇</Button>
      </div>
      {isEmployeeModalVisible &&
        <Modal title="員工編號" open={true} footer={null} onCancel={() => setIsEmployeeModalVisible(false)} >
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {
            //   renderEmployeeButtons()
            }
          </div>
        </Modal >
      }
    </>
  );
};

export default DepartmentModal;