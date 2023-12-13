import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import api from '../api';

const ListarEnderecos = () => {
  const [enderecos, setEnderecos] = React.useState(null);

  useEffect(() => {
    api.get('/restricted/enderecos') // Assuming the endpoint for addresses is '/restricted/enderecos'
      .then(response => {
        console.log(response.data);
        setEnderecos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
        Listar endereços
      </Typography>
      {enderecos &&
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>Logradouro</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enderecos.map((endereco) => (
                <TableRow key={endereco.codigo}>
                  <TableCell>{endereco.codigo}</TableCell>
                  <TableCell>{endereco.cep}</TableCell>
                  <TableCell>{endereco.logradouro}</TableCell>
                  <TableCell>{endereco.bairro}</TableCell>
                  <TableCell>{endereco.cidade}</TableCell>
                  <TableCell>{endereco.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
};

export default ListarEnderecos;