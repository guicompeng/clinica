import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box, Container, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api';

const Pep = () => {
  const [prontuario, setProntuario] = useState({
    codigoPaciente: '',
    anamnese: '',
    medicamentos: '',
    atestados: '',
    exames: '',
  });

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get('/restricted/pacientes');
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProntuario({
      ...prontuario,
      [name]: value,
    });
  };

  const handlePacienteChange = (e) => {
    const selectedPacienteCode = e.target.value;
    setSelectedPaciente(selectedPacienteCode);

    // Update the prontuario state with the selected patient code
    setProntuario({
      ...prontuario,
      codigoPaciente: selectedPacienteCode,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/restricted/prontuarios', prontuario);
      console.log('Prontuário cadastrado com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Prontuário cadastrado com sucesso!',
        icon: 'success',
      }).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao cadastrar prontuário:', error);
    }
  };

  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
          Cadastro de Prontuário Eletrônico do Paciente (PEP)
        </Typography>
        <form onSubmit={handleSubmit}>




          <Grid container spacing={2} mt={4}>
            <Grid item md={6}>
            <FormControl fullWidth>
                <InputLabel id="select-paciente-label">Selecione o Paciente</InputLabel>
                <Select
                  labelId="select-paciente-label"
                  id="select-paciente"
                  value={selectedPaciente}
                  onChange={handlePacienteChange}
                  required
                  label="Selecione o paciente"
                  style={{ textAlign: 'left' }}
                >
                  <MenuItem value="" disabled>
                    Selecione o Paciente
                  </MenuItem>
                  {pacientes.map((paciente) => (
                    <MenuItem key={paciente.codigo} value={paciente.codigo}>
                      {paciente.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Anamnese"
                variant="outlined"
                fullWidth
                name="anamnese"
                value={prontuario.anamnese}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Medicamentos"
                variant="outlined"
                fullWidth
                name="medicamentos"
                value={prontuario.medicamentos}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Atestados"
                variant="outlined"
                fullWidth
                name="atestados"
                value={prontuario.atestados}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Exames"
                variant="outlined"
                fullWidth
                name="exames"
                value={prontuario.exames}
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
              Cadastrar Prontuário
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Pep;