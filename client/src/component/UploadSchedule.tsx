import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import axios from 'axios';

interface ExcelData {
    [key: string]: string | number;
}

const UploadSchedule: React.FC = () => {

    const [excelData, setExcelData] = useState<ExcelData[]>([]);
    const [btnEnable, setBtnEnable] = useState<boolean>(false);

    const columnMap: Record<string, string> = {
        員工代號: 'employee_id',
        員工姓名: 'name',
        班別: '1',
    };

    for (let i = 1; i <= 30; i++) {
        columnMap[`班別_${i}`] = (i + 1).toString();
    }

    useEffect(() => {
        console.log(excelData);
        setBtnEnable(true)
    }, [excelData]);

    const handleFile = (file: File | null) => {

        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const targetdata: ExcelData[] = XLSX.utils.sheet_to_json(worksheet, { range: 2 });

            console.log(targetdata);
            const fixKeyName = targetdata.map((obj: any) => {
                const transformedObj: any = {};
                for (const [key, value] of Object.entries(obj)) {
                    const columnName = columnMap[key] || key;
                    transformedObj[columnName] = value;
                }
                return transformedObj;
            });

            //console.log(fixKeyName);
            setExcelData(prev => {
                const newData = fixKeyName.map(obj => ({ ...obj, month: 3, year: 2023 }));
                return [...prev, ...newData];
            })
        };
        reader.readAsBinaryString(file);
    };

    const handleUploadClick = async () => {
        try {
            const response = await axios.post('http://localhost:5000/schedule/', excelData);
            if (response.status === 200) {
                console.log(response);
            }
        } catch (error) {
            console.log("error uploading schedule");
        }
    }
    return (
        <>
            <input className="center" type="file" onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} />
            <Button disabled={!btnEnable} type="primary" onClick={handleUploadClick}>上傳</Button>
        </>
    );
}

export default UploadSchedule;
