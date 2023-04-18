import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

type NewNativeSelectProps = {
    Label: string;
    value: string | number;
    Options: Array<string | number> | Array<string> | Array<number> | null | undefined;
    onChange: (value: string | number) => void;
};

export default function NewNativeSelect({ Label, value, Options, onChange }: NewNativeSelectProps) {

    return (
        <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {Label}
                </InputLabel>
                <NativeSelect
                    value={value || ''}
                    inputProps={{
                        id: 'uncontrolled-native',
                    }}
                    sx={{
                        "& option": {
                            textAlign: "center",
                        },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
                >
                    {Options != null ? (
                        Options.map((option: string | number, index: React.Key | null | undefined) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))
                    ) : null}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
