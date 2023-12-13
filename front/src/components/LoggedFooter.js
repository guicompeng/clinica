import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';

const LoggedFooter = () => {
  const theme = useTheme();

  return (
    <Paper
      style={{
        backgroundColor: theme.palette.primary.main,
        padding: '8px',
        paddingLeft: '240px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" color="white">
        Clínica Cefet Saúde - (31)3333-3333
      </Typography>
    </Paper>
  );
};

export default LoggedFooter;