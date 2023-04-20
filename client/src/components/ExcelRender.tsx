import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ExcelData } from '../interface/Components';

function ExcelRender({ text }: { text: string }) {

  const [excelData, setExcelData] = useState<{ [key: string]: any }>([]);
  const [date, setDate] = useState('');

  const handleFile = (file: File | null) => {

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const targetdata: ExcelData[] = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      // .map((row, index) => {
      //   return {
      //     ...(row as object),
      //     key: index
      //     // sale_no:row[0] as object
      //   };
      // });

      targetdata.forEach(obj => {
        Object.keys(obj).forEach(key => {
          // 如果属性名是__EMPTY，将其值轉int
          if (key === '__EMPTY') {
            obj[key] = `${parseInt(obj[key].toString())}`;
          }
        });
      });

      // const targetdata: ExcelData[] = (XLSX.utils.sheet_to_json(worksheet, { header: 2 })as ExcelData[]);
      setExcelData(targetdata);
      console.log(targetdata);

      //轉成  20XX/XX/XX
      const excelDate = new Date(Date.UTC(1900, 0, (parseInt(worksheet["D2"].v) - 1)));
      const formattedDate = format(excelDate, 'yyyy/MM/dd');
      setDate(formattedDate);
    };
    reader.readAsBinaryString(file);
  };

  // const newData = excelData.map((obj: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  //   const entries = Object.entries(obj);
  //   const newEntries = entries.filter(([key, value]) => key !== '__EMPTY');
  //   return Object.fromEntries(newEntries);
  // });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <span>{text}</span>
      </div>
      <div style={{ display: "flex", textAlign: "center",marginLeft:"3vh" }}>
        <input className="center" type="file" onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} />
      </div>
    </div>
  );
}

export default ExcelRender;


