import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export const OvertimeRecords = async (overtimeRecords, res) => {
    const workbook = new ExcelJS.Workbook();
    const templatePath = 'C:\\temp\\overtimeRecords(T).xlsx';
    await workbook.xlsx.readFile(templatePath);
    const worksheet = workbook.getWorksheet('工作表1');

    // 將資料複製到新的工作表中
    let i = 2;
    if (overtimeRecords.length < 0) return;
    for (const record of overtimeRecords) {
        worksheet.getCell(`A${i}`).value = record.employee_id;
        worksheet.getCell(`B${i}`).value = record.name;
        worksheet.getCell(`C${i}`).value = record.overtime_type_id;
        worksheet.getCell(`D${i}`).value = new Date(record.start_time);
        worksheet.getCell(`E${i}`).value = new Date(record.start_time);
        worksheet.getCell(`F${i}`).value = new Date(record.start_time);
        worksheet.getCell(`G${i}`).value = new Date(record.end_time);
        worksheet.getCell(`H${i}`).value = new Date(record.end_time);
        worksheet.getCell(`I${i}`).value = record.hours;
        worksheet.getCell(`L${i}`).value = record.reason;
        i++;
    }
    // 儲存 Excel 檔案
    const filename = 'overtimesRecords.xlsx';
    const filepath = path.join('C:\\temp\\', filename);
    await workbook.xlsx.writeFile(filepath);


    // 將 Excel 檔案作為附件發送到前端
    const filestream = fs.createReadStream(filepath);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    filestream.pipe(res);

    // 刪除暫存檔案
    //fs.unlinkSync(filepath);
};
