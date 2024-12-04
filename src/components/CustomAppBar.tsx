import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

interface AppBarProps {
    backPath: string;
    pageTitle: string;
    deleteAction?: () => void | null;
}

const CustomAppBar: React.FC<AppBarProps> = ({ backPath, pageTitle, deleteAction }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="voltar"
                    onClick={() => navigate(backPath)}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="h6" component="div">
                    {pageTitle}
                </Typography>
                {deleteAction && (
                    <>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="deletar"
                            onClick={deleteAction}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
