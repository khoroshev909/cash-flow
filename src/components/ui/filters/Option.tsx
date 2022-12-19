import React, {FC, MouseEvent} from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface OptionProps {
    label: string,
    onRemove: (event: MouseEvent<HTMLButtonElement>) => void
}
export const Option:FC<OptionProps> = React.memo(({ label, onRemove }) => {
    return (
       <Box className="filter-option">
           <Typography variant="caption">{label}</Typography>
           <IconButton
               onClick={(event: MouseEvent<HTMLButtonElement>) => onRemove(event)}
               aria-label="delete"
               sx={{ p: 0.5 }} >
               <HighlightOffIcon
                   style={{ height: '15px', width: '15px' }}
                   sx={{'&:hover': { color: 'primary.main'}} } />
           </IconButton>
       </Box>
    );
})
