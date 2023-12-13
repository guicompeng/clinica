import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    return (
        <Paper
            style={{
                backgroundColor: theme.palette.primary.main,
                padding: '16px',
                marginTop: 'auto',
                textAlign: 'center',
                height: '200px', // Altura desejada
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h5" color="white">
                Clínica Cefet Saúde
            </Typography>
            <Typography variant="body1" color="white">
                (31)3333-3333
            </Typography>
            <Typography variant="body1" color="white">
                contato@cefetsaude.org.br
            </Typography>
        </Paper>
    );
};

export default Footer;