import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import api from '../api';

const ListarAgendamentos = () => {
  const [agendamentos, setAgendamentos] = React.useState(null);

  useEffect(() => {
    api.get('/restricted/agendamentos')
      .then(response => {
        const formattedAgendamentos = response.data.map(agendamento => ({
          ...agendamento,
          data: new Date(agendamento.data).toLocaleDateString(),
        }));
        console.log(formattedAgendamentos);
        setAgendamentos(formattedAgendamentos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
        Listar todos agendamentos
      </Typography>
      {agendamentos &&
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Código do Médico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agendamentos.map((agendamento) => (
                <TableRow key={agendamento.codigo}>
                  <TableCell>{agendamento.codigo}</TableCell>
                  <TableCell>{agendamento.data}</TableCell>
                  <TableCell>{agendamento.horario}</TableCell>
                  <TableCell>{agendamento.nome}</TableCell>
                  <TableCell>{agendamento.email}</TableCell>
                  <TableCell>{agendamento.telefone}</TableCell>
                  <TableCell>{agendamento.codigomedico}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
};

export default ListarAgendamentos;