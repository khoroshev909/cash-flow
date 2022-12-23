import React, {FC, useState} from 'react';
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface ConfirmPasswordProps {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error: string,
    showError: boolean
}
export const ConfirmPassword:FC<ConfirmPasswordProps> = React.memo(({ value, onChange, error, showError }) => {

    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event)

    return (
        <FormControl sx={{ display: 'block' }}>
            <Box>
                <TextField
                    margin="normal"
                    fullWidth
                    error={showError}
                    name="confirm"
                    value={value}
                    onChange={changeHandler}
                    label="Пароль"
                    type={isPasswordHidden ? "password" : "text"}
                    id="confirm"
                    autoComplete="confirm-password" />
                <IconButton
                    sx={{ position: 'absolute', top: 'calc(50% - 16px)', right: '2%', padding: 1 }}
                    onClick={() => setIsPasswordHidden(prev => !prev)}>
                    {isPasswordHidden ? <VisibilityIcon height={3} width={3}/> : <VisibilityOffIcon height={3} width={3}/>}
                </IconButton>
            </Box>
            {showError && (
                <Typography variant="caption" sx={{ color: red[700] }}>
                    {error}
                </Typography>
            )}
        </FormControl>
    );
})
