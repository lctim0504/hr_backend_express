import React, { useEffect, useState } from 'react';
import { Button, FormInstance, Input, Modal } from 'antd';
import axios from 'axios';

interface DepartmentModalProps {
  form: FormInstance;
}


const DepartmentModal: React.FC<DepartmentModalProps> = ({ form }) => {
  const [departments, setDepartments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/item/departments')
      .then(response => {
        const result = response.data;
        //console.log(result);
        setDepartments(result)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleButtonClick = (department_id: string) => {
    setDepartmentId(department_id)
    setIsModalVisible(false)
    form.setFieldsValue({ department_id });
  };

  const renderDepartmentButtons = () => {
    return departments.map((department: any) => (
      <div key={department.department_id}>
        <Button style={{ width: '100%' }} onClick={() => handleButtonClick(department.department_id)}>
          {department.name}({department.department_id})
        </Button>
      </div>
    ));
  };

  const handleDepartmentBtnClick = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <div
        style={{ display: 'flex' }}
      >
        <Input style={{ display: 'flex' }} value={departmentId} />
        <Button style={{ display: 'flex' }} onClick={handleDepartmentBtnClick}>選擇</Button>
      </div>
      {isModalVisible &&
        <Modal title="部門" open={true} footer={null}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
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