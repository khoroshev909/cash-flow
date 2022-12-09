import React,{FC} from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer:FC = React.memo(() => {
    return (
        <Box sx={{py: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="subtitle2" color="text.secondary" align="center">
              {'By Eugene Khoroshev ©'}
            </Typography>
              <Link variant="caption" href="https://mui.com/">
                khoroshev909.com
              </Link>{' '}
              <Typography variant="caption" color="text.secondary">
                {new Date().getFullYear()}
            </Typography>
        </Box>
    );
})
 