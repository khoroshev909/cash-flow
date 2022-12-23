import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";

interface TextInputProps {
    value: string,
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error: string,
    showError: boolean,
    label: string,
    id: string,
    autoFocus?: boolean
}
export const TextInput: FC<TextInputProps> = React.memo(({ value, name, onChange, error, showError, label, id, autoFocus = false }) => {

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event)

    return (
        <FormControl sx={{ display: 'block' }}>
            <TextField
                margin="normal"
                fullWidth
                error={showError}
                name={name}
                value={value}
                onChange={changeHandler}
                label={label}
                type="text"
                id={id}
                autoFocus={autoFocus} />
            {showError && (
                <Typography variant="caption" sx={{ color: red[700] }}>
                    {error}
                </Typography>
            )}
        </FormControl>
    );
})
