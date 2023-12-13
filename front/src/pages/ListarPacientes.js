import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import api from '../api';

const ListarPacientes = () => {
  const [pacientes, setPacientes] = React.useState(null);

  useEffect(() => {
    api.get('/restricted/pacientes') // Assuming the endpoint for patients is '/restricted/pacientes'
      .then(response => {
        console.log(response.data)
        setPacientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
        Listar pacientes
      </Typography>
      {pacientes &&
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>Logradouro</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Peso</TableCell>
                <TableCell>Altura</TableCell>
                <TableCell>Tipo Sanguíneo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow key={paciente.codigo}>
                  <TableCell>{paciente.codigo}</TableCell>
                  <TableCell>{paciente.nome}</TableCell>
                  <TableCell>{paciente.email}</TableCell>
                  <TableCell>{paciente.telefone}</TableCell>
                  <TableCell>{paciente.cep}</TableCell>
                  <TableCell>{paciente.logradouro}</TableCell>
                  <TableCell>{paciente.bairro}</TableCell>
                  <TableCell>{paciente.cidade}</TableCell>
                  <TableCell>{paciente.estado}</TableCell>
                  <TableCell>{paciente.peso}</TableCell>
                  <TableCell>{paciente.altura}</TableCell>
                  <TableCell>{paciente.tiposanguineo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
};

export default ListarPacientes;