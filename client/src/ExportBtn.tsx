import { Button } from 'antd';
import axios from 'axios';

const ExportBtn = () => {
  
  const handleExport = () => {
    axios.get('http://localhost:5000/export/leaveExcel', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leavesRecords.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Button onClick={handleExport}>ExportBtn</Button>
  )
}

export default ExportBtn;
