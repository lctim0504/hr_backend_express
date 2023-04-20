import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormInstance, Input, Modal } from 'antd';
import axios from 'axios';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemDepartments } from '../app/ItemApi';
import { DepartmentModalProps } from '../interface/Components';

const DepartmentModal: React.FC<DepartmentModalProps> = (props) => {
  const [departments, setDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const handleDepartmentBtnClick = () => {
    setIsModalVisible(true);
  };
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    props.setIsSV(e.target.checked);
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input style={{ display: 'flex' }} value={departmentId} />
        <Button style={{ display: 'flex' }} onClick={handleDepartmentBtnClick}>選擇</Button>
      </div>
      {
        props.svChk ?
          <Checkbox onChange={handleCheckboxChange} >設定為部門主管</Checkbox>
          : null
      }
      {isModalVisible &&
        <Modal title="部門" open={true} footer={null} onCancel={() => setIsModalVisible(false)} >
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            {
              renderDepartmentButtons()
            }
          </div>
        </Modal >
      }
    </>
  );
};

export default DepartmentModal;