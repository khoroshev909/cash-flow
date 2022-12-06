import React, {FC, MouseEvent} from 'react';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {default as Img} from "@mui/material/Avatar";
import Badge from '@mui/material/Badge'
import { UserData } from '../../types/models';

interface AvatarProps {
    data: UserData | null,
    open: (event: MouseEvent<HTMLElement>) => void
}

export const Avatar:FC<AvatarProps> = React.memo(({ data, open }) => {
    return (
        <Tooltip title="Настройки профиля">
            <IconButton onClick={open} sx={{p: 0}}>
                <Img alt={data?.username} src={data?.avatar || 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250'} />
                <Badge 
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: 0
                    }} 
                    badgeContent={17} 
                    color="error" />
            </IconButton>
        </Tooltip>        
    )
})
 
