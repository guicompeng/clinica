import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api';
import InputMask from 'react-input-mask';

const NovoPaciente = () => {
  const [paciente, setPaciente] = useState({
    nome: '',
    email: '',
    telefone: '',
    CEP: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    peso: '',
    altura: '',
    tipoSanguineo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({
      ...paciente,
      [name]: value,
    });
  };

  const handleCepSearch = async () => {
    try {
      const response = await api.get(`/restricted/buscar-endereco?CEP=${paciente.CEP}`);
      const endereco = response.data;
      setPaciente({
        ...paciente,
        ...endereco,
      });
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/restricted/pacientes', paciente);
      console.log('Paciente cadastrado com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Paciente cadastrado com sucesso!',
        icon: 'success',
      }).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
    }
  };

  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
          Cadastrar novo paciente
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={4}>
            <Grid item md={6}>
              <TextField
                label="Nome"
                fullWidth
                variant="outlined"
                name="nome"
                value={paciente.nome}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                name="email"
                value={paciente.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputMask
                mask="(99)99999-9999"
                value={paciente.telefone}
                onChange={handleInputChange}
              >
                {() => (
                  <TextField
                    label="Telefone"
                    fullWidth
                    variant="outlined"
                    name="telefone"
                    required
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Peso"
                fullWidth
                variant="outlined"
                name="peso"
                value={paciente.peso}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Altura"
                fullWidth
                variant="outlined"
                name="altura"
                value={paciente.altura}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Tipo Sanguíneo"
                fullWidth
                variant="outlined"
                name="tipoSanguineo"
                value={paciente.tipoSanguineo}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Campos de endereço */}
            <Grid item md={6}>
              <InputMask
                mask="99.999-999"
                value={paciente.CEP}
                onChange={handleInputChange}
                onBlur={handleCepSearch}
              >
                {() => (
                  <TextField
                    label="CEP"
                    fullWidth
                    variant="outlined"
                    name="CEP"
                    required
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Logradouro"
                fullWidth
                variant="outlined"
                name="logradouro"
                value={paciente.logradouro}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Bairro"
                fullWidth
                variant="outlined"
                name="bairro"
                value={paciente.bairro}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Cidade"
                fullWidth
                variant="outlined"
                name="cidade"
                value={paciente.cidade}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Estado"
                fullWidth
                variant="outlined"
                name="estado"
                value={paciente.estado}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ width: '500px', marginTop: 32 }}
            >
              Cadastrar Paciente
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default NovoPaciente;