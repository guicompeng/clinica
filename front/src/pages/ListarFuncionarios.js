import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import api from '../api';

// Função para formatar a data
const formatarData = (data) => {
  const dataContrato = new Date(data);
  const dia = String(dataContrato.getDate()).padStart(2, '0');
  const mes = String(dataContrato.getMonth() + 1).padStart(2, '0');
  const ano = dataContrato.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const ListarFuncionarios = () => {
  const [funcionarios, setFuncionarios] = React.useState(null);
  useEffect(() => {
    api.get('/restricted/funcionarios')
      .then(response => {
        console.log(response.data)
        setFuncionarios(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
        Listar funcionários
      </Typography>
      {funcionarios &&
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
                <TableCell>Data do Contrato</TableCell>
                <TableCell>Salário</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TableRow key={funcionario.codigo}>
                  <TableCell>{funcionario.codigo}</TableCell>
                  <TableCell>{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.email}</TableCell>
                  <TableCell>{funcionario.telefone}</TableCell>
                  <TableCell>{funcionario.cep}</TableCell>
                  <TableCell>{funcionario.logradouro}</TableCell>
                  <TableCell>{funcionario.bairro}</TableCell>
                  <TableCell>{funcionario.cidade}</TableCell>
                  <TableCell>{funcionario.estado}</TableCell>
                  <TableCell>{formatarData(funcionario.datacontrato)}</TableCell>
                  <TableCell>{funcionario.salario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
};

export default ListarFuncionarios;