import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideDialog({ dialogTitle, dialogText, btn_name,  disabled, onClick }: {
    dialogTitle: string, dialogText: string,  disabled: boolean,
    btn_name: string, onClick: () => void
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // if (isApplied) {
        //     alert("已有紀錄，不可再次申請!");
        //     return;
        // }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        setOpen(false);
        if (onClick) {
            onClick();
        }
    };

    return (
        <div>
            <Button variant="contained" disabled={disabled || false} onClick={handleClickOpen}>
                {btn_name}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>確認</Button>
                    <Button onClick={handleClose}>取消</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
