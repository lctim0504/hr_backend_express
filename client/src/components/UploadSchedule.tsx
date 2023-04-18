import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { SchedulePost } from '../app/ScheduleApi';
import { ExcelData } from '../interface/Components';
import { message } from 'antd';

const UploadSchedule: React.FC = () => {

    const [excelData, setExcelData] = useState<ExcelData[]>([]);
    const [btnEnable, setBtnEnable] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(1);
    const [year, setYear] = useState<number>(1);
    const [isMessageShown, setIsMessageShown] = useState(false);

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

    useEffect(() => {
        setExcelData(prev => {
            const newData = prev.map(obj => ({ ...obj, month: month, year: year }));
            return newData;
        })
        console.log(excelData);
    }, [month]);

    useEffect(() => {

    }, [month])

    function excelDateToYear(excelDate: number) {
        var baseDate = new Date(1900, 0, 1); // Excel基准日期为1900年1月1日
        var timeInMs = (excelDate - 1) * 86400000; // 将Excel日期转换为毫秒数
        var jsDate = new Date(baseDate.getTime() + timeInMs); // 将毫秒数加到基准日期上
        var year = jsDate.getFullYear();
        return year;
    }

    function excelDateToMonth(excelDate: number) {
        var baseDate = new Date(1900, 0, 1); // Excel基准日期为1900年1月1日
        var timeInMs = (excelDate - 1) * 86400000; // 将Excel日期转换为毫秒数
        var jsDate = new Date(baseDate.getTime() + timeInMs); // 将毫秒数加到基准日期上
        var month = jsDate.getMonth() + 1;
        return month;
    }

    const handleFile = (file: File | null) => {

        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const targetdata: ExcelData[] = XLSX.utils.sheet_to_json(worksheet, { range: 2 });

            const fixKeyName = targetdata.map((obj: any) => {
                const transformedObj: any = {};
                for (const [key, value] of Object.entries(obj)) {
                    const columnName = columnMap[key] || key;
                    transformedObj[columnName] = value;
                }
                return transformedObj;
            });

            setExcelData(fixKeyName);
            try {
                setMonth(excelDateToMonth(worksheet.D2.v));
                setYear(excelDateToYear(worksheet.D2.v));
            }
            catch {
                message.error("上傳excel格式有誤，無法帶入");
            }

        };
        reader.readAsBinaryString(file);
    };

    const handleUploadClick = async () => {
        console.log(excelData);
        try {
            await SchedulePost(excelData)
                .then(() => message.success('上傳成功'))
                .catch(() => message.error("上傳失敗"));
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <input className="upload" type="file" onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} />
            <Button disabled={!btnEnable} type="primary" onClick={handleUploadClick}>上傳</Button>
        </>
    );
}

export default UploadSchedule;
