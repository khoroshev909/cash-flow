import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";

interface EmailControlProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error: string,
    showError: boolean
}
export const EmailControl:FC<EmailControlProps> = React.memo(({ value, onChange, error, showError }) => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event)

    return (
        <FormControl sx={{ display: 'block' }}>
            <TextField
                margin="normal"
                error={showError}
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={value}
                onChange={changeHandler}
                autoComplete="email" />
            {showError && (
                <Typography variant="caption" sx={{ color: red[700] }}>
                    {error}
                </Typography>
            )}
        </FormControl>
    );
})
