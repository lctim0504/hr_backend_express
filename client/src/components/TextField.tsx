import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { MultilineTextFieldsProps } from '../interface/Components';

export default function MultilineTextFields({ rows, value, onChange }: MultilineTextFieldsProps) {

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={rows}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </Box>
    );
}
