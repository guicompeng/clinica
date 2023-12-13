import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import api from '../api';
import { Box, Container, Typography } from '@mui/material';
import imagemEndereco from '../img/endereco.png';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';

const NovoEndereco = () => {
  const [endereco, setEndereco] = useState({
    CEP: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/public/enderecos', endereco);
      console.log('Endereço cadastrado com sucesso:', response.data);
      Swal.fire({
        title: "Sucesso!",
        text: "Endereço cadastrado com sucesso!",
        icon: "success"
      }).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao cadastrar endereço:', error);
    }
  };

  return (
    <Container>
      <Box m={8} textAlign="center">
        <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
          Cadastrar novo endereço
        </Typography>

        <img
          src={imagemEndereco}
          alt="Endereco"
          style={{ maxWidth: '100%', height: '200px', margin: 'auto' }}
        />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={4}>
            <Grid item md={6} >
              <InputMask
                mask="99.999-999"
                value={endereco.CEP}
                onChange={handleInputChange}
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
                variant="outlined"
                fullWidth
                name="logradouro"
                value={endereco.logradouro}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Bairro"
                variant="outlined"
                fullWidth
                name="bairro"
                value={endereco.bairro}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Cidade"
                variant="outlined"
                fullWidth
                name="cidade"
                value={endereco.cidade}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Estado"
                variant="outlined"
                fullWidth
                name="estado"
                value={endereco.estado}
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
              Cadastrar Endereço
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default NovoEndereco;
