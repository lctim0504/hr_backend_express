import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';
import SlideDialog from './DiaLog';
import Box from '@mui/material/Box';
import { Props } from '../interface/Components';
import SlideDialog2 from './DiaLogInput';

const DenseTable = ({ tableHead, data, handleDialogClick }: Props) => {
    const text1 = '已核准', text2 = '未審核';

    const [orderBy, setOrderBy] = React.useState('');
    const [order, setOrder] = React.useState('asc');

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = React.useMemo(() => {
        if (orderBy === '') {
            return data;
        }
        return data.sort((a, b) => {
            const aPermit = a?.sv_permit ?? false;
            const bPermit = b?.sv_permit ?? false;
            if (order === 'asc') {
                return aPermit > bPermit ? 1 : -1;
            } else {
                return aPermit < bPermit ? 1 : -1;
            }
        });
    }, [data, order, orderBy]);
 
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableHead.map((headerText, index) => (
                            <TableCell key={headerText} align="center">
                                <TableSortLabel
                                    active={orderBy === index.toString()}
                                    direction={'asc'}
                                    onClick={() => handleRequestSort(index.toString())}
                                >
                                    {headerText}
                                    {orderBy === index.toString() && (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    )}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((data) => (
                        <TableRow
                            key={data.seq}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                {data.start_time ? moment.utc(new Date(data.start_time)).format('YYYY/MM/DD HH:mm') : "-"}
                            </TableCell>
                            <TableCell align="center">
                                {data.end_time ? moment.utc(new Date(data.end_time)).format('YYYY/MM/DD HH:mm') : "-"}
                            </TableCell>
                            <TableCell align="center">
                                {data.create_time ? moment.utc(new Date(data.create_time)).format('YYYY/MM/DD') : "-"}
                            </TableCell>
                            {tableHead[0].includes("請假") ? null : (
                                <>
                                    <TableCell align="center">
                                        {data.start_time ? moment.utc(new Date(data.start_time)).format('YYYY/MM/DD HH:mm') : "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.end_time ? moment.utc(new Date(data.end_time)).format('YYYY/MM/DD HH:mm') : "-"}
                                    </TableCell>
                                </>
                            )}
                            <TableCell align="center">{data.hours}</TableCell>
                            <TableCell
                                sortDirection={orderBy === '4' ? (order === 'asc' ? 'asc' : 'desc') : false}
                                className='approval'
                                data-permit={data.sv_permit}
                                align="center"
                            >
                                {data.sv_permit ? text1 : text2}
                            </TableCell>
                            {data.sv_permit ?? false ? (
                                <TableCell align="center">
                                    <Button variant="outlined" color="error">刪除</Button>
                                </TableCell>
                            ) : (
                                <TableCell align="center">
                                    <SlideDialog
                                        dialogTitle={"刪除確認"}
                                        dialogText={""}
                                        btn_name={"刪除"}
                                        onClick={() => handleDialogClick(data.seq)}
                                        disabled={false}
                                    />
                                </TableCell>
                            )}
                            {tableHead[0].includes("請假") ? null : (
                                <TableCell align="center">
                                    <SlideDialog2
                                        dialogTitle={"時間確認"}
                                        dialogText={""}
                                        btn_name={"更新"}
                                        seq={data.seq}
                                        disabled={false}
                                        start_time={data.start_time}
                                        end_time={data.end_time}
                                    />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DenseTable;
