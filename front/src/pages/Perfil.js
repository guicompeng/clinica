import React, { useEffect } from 'react';
import { Container, Paper, Typography, Grid, Avatar, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import api from '../api';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);
  useEffect(() => {
    api.get('/restricted/perfil')
      .then(response => {
        console.log(response.data)
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Erro!',
          text: 'Área restrita, por favor faça login',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          navigate("/login");
        });
      });
  }, [])
  return (
    <Box mb={20}>
      {userData &&
        <Container maxWidth="md" style={{ marginTop: 30 }}>
          <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
              <AccountCircleIcon style={{ fontSize: 80 }} />
            </Avatar>
            <Typography variant="h4" style={{ margin: '10px 0' }}>
              Bem-vindo, {userData.nome}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {userData.especialidade}
            </Typography>

            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <EmailIcon style={{ marginRight: 5 }} />
                  {userData.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <PhoneIcon style={{ marginRight: 5 }} />
                  {userData.telefone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <LocationOnIcon style={{ marginRight: 5 }} />
                  {`${userData.logradouro}, ${userData.bairro}, ${userData.cidade}, ${userData.estado}, ${userData.cep}`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <EventIcon style={{ marginRight: 5 }} />
                  {new Date(userData.datacontrato).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <AttachMoneyIcon style={{ marginRight: 5 }} />
                  {`Salário: ${userData.salario}`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <BusinessCenterIcon style={{ marginRight: 5 }} />
                  {`CRM: ${userData.crm}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      }
    </Box>
  );
};