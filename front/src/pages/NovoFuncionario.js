import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Container, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api';
import InputMask from 'react-input-mask';

const NovoFuncionario = () => {
  const [funcionario, setFuncionario] = useState({
    nome: '',
    email: '',
    telefone: '',
    CEP: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    dataContrato: '',
    salario: '',
    senha: '',
    eMedico: false,
    especialidade: '',
    CRM: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFuncionario({
      ...funcionario,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFuncionario({
      ...funcionario,
      [name]: checked,
    });
  };

  const handleCepSearch = async () => {
    try {
      const response = await api.get(`/restricted/buscar-endereco?CEP=${funcionario.CEP}`);
      const endereco = response.data;
      setFuncionario({
        ...funcionario,
        ...endereco,
      });
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format the date to "YYYY-MM-DD" before sending it to the API
      const formattedDate = funcionario.dataContrato.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
      const payload = {
        ...funcionario,
        dataContrato: formattedDate,
      };

      const response = await api.post('/restricted/funcionarios', payload);
      console.log('Funcionário cadastrado com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Funcionário cadastrado com sucesso!',
        icon: 'success',
      }).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
    }
  };

  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
          Cadastrar novo funcionário
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={4}>
            {/* Campos de informações pessoais */}
            <Grid item md={6}>
              <TextField
                label="Nome"
                fullWidth
                variant="outlined"
                name="nome"
                value={funcionario.nome}
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
                value={funcionario.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
            <InputMask
                mask="(99)99999-9999"
                value={funcionario.telefone}
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
              {/* Utilize o componente InputMask para aplicar a máscara de data */}
              <InputMask
                mask="99/99/9999"
                value={funcionario.dataContrato}
                onChange={handleInputChange}
              >
                {() => (
                  <TextField
                    label="Data de Contrato"
                    fullWidth
                    variant="outlined"
                    name="dataContrato"
                    required
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Salário"
                fullWidth
                variant="outlined"
                type="number"
                name="salario"
                value={funcionario.salario}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Senha"
                fullWidth
                variant="outlined"
                type="password"
                name="senha"
                value={funcionario.senha}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Campos de endereço */}
            <Grid item md={6}>
            <InputMask
                mask="99.999-999"
                value={funcionario.CEP}
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
                value={funcionario.logradouro}
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
                value={funcionario.bairro}
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
                value={funcionario.cidade}
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
                value={funcionario.estado}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Campos específicos de médico */}
            <Grid item md={6} className="checkbox-container">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={funcionario.eMedico} 
                    onChange={handleCheckboxChange}
                    name="eMedico"
                    className="custom-checkbox" // Add a custom class to the checkbox
                  />
                }
                label="Funcionário é médico?"
              />
            </Grid>
            {funcionario.eMedico && (
              <>
                <Grid item md={6}>
                  <TextField
                    label="Especialidade"
                    fullWidth
                    variant="outlined"
                    name="especialidade"
                    value={funcionario.especialidade}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="CRM"
                    fullWidth
                    variant="outlined"
                    name="CRM"
                    value={funcionario.CRM}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ width: '500px', marginTop: 32 }}
            >
              Cadastrar Funcionário
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default NovoFuncionario;