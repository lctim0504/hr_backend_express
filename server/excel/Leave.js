import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export const LeaveRecords = async (leaveRecords, res) => {
    const workbook = new ExcelJS.Workbook();
    const templatePath = 'C:\\temp\\leavesRecords(T).xlsx';
    await workbook.xlsx.readFile(templatePath);
    const worksheet = workbook.getWorksheet('員工範本');

    // 將資料複製到新的工作表中
    let i = 2;
    for (const record of leaveRecords) {
        worksheet.getCell(`A${i}`).value = record.employee_id;
        worksheet.getCell(`B${i}`).value = record.name;
        worksheet.getCell(`C${i}`).value = record.leave_type_id;
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
    const filename = 'leavesRecords.xlsx';
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
