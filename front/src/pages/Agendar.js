// Importe o useState e o useEffect se ainda não estiverem importados
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, MenuItem, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api';
import InputMask from 'react-input-mask';
const Agendar = () => {
  const [agenda, setAgenda] = useState({
    especialidade: "",
    codigoMedico: null,
    data: "",
    horario: null,
    nome: "",
    email: "",
    telefone: "",
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [horariosAgendados, setHorariosAgendados] = useState([]);

  useEffect(() => {
    // Carregar especialidades ao montar o componente
    const fetchEspecialidades = async () => {
      try {
        const response = await api.get('/public/especialidades');
        setEspecialidades(response.data);
      } catch (error) {
        console.error('Erro ao obter especialidades:', error);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleEspecialidadeChange = async (e) => {
    const especialidadeSelecionada = e.target.value;

    // Carregar médicos da especialidade selecionada
    try {
      const response = await api.get('/public/medicos', {
        params: { especialidade: especialidadeSelecionada },
      });

      setMedicos(response.data);
      setAgenda({ ...agenda, especialidade: especialidadeSelecionada, codigoMedico: null });
    } catch (error) {
      console.error('Erro ao obter médicos:', error);
    }
  };

  const handleDateChange = async (e) => {
    const { name, value } = e.target;
    setAgenda({
      ...agenda,
      [name]: value,
    });

    if (value.replace(/\D/g, '').length === 8) {
      // Format the date to "YYYY-MM-DD" before sending it to the API
      const formattedDate = value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');

      // Fetch horários agendados
      try {
        console.log(agenda)
        const response = await api.get('/public/horarios-agendados', {
          params: {
            data: formattedDate,
            codigoMedico: agenda.codigoMedico,
          },
        });

        setHorariosAgendados(response.data);
      } catch (error) {
        console.error('Erro ao obter horários agendados:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgenda({
      ...agenda,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...agenda,
        data: agenda.data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
      };

      const response = await api.post('/public/agendamentos', payload);
      console.log('agenda cadastrada com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Consulta agendada com sucesso!',
        icon: 'success',
      }).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro ao agendar:', error);
    }
  };

  // Lista de horários disponíveis (de 8 a 17)
  const horariosDisponiveis = Array.from({ length: 10 }, (_, index) => index + 8)
    .filter((horario) => !horariosAgendados.includes(horario));

  return (
    <Container>
      <Box textAlign="center" mt={8} mb={16}>
        <Typography variant="h4" style={{ fontWeight: 300 }} gutterBottom>
          Agendar Consulta
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={4}>
            <Grid item md={6}>
              <TextField
                select
                label="Especialidade"
                fullWidth
                variant="outlined"
                name="especialidade"
                value={agenda.especialidade}
                onChange={handleEspecialidadeChange}
                required
                style={{ textAlign: 'left' }}
              >
                {especialidades.map((especialidade) => (
                  <MenuItem key={especialidade} value={especialidade}>
                    {especialidade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6}>
              <TextField
                select
                label="Médico"
                fullWidth
                variant="outlined"
                name="codigoMedico"
                value={agenda.codigoMedico}
                onChange={handleInputChange}
                required
                style={{ textAlign: 'left' }}
              >
                {medicos.map((medico) => (
                  <MenuItem key={medico.codigo} value={medico.codigo}>
                    {medico.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6}>
              {/* Utilize o componente InputMask para aplicar a máscara de data */}
              <InputMask
                mask="99/99/9999"
                value={agenda.data}
                onChange={(e) => {
                  handleInputChange(e);
                  handleDateChange(e); // Chama handleDateChange ao alterar a data
                }}
              >
                {() => (
                  <TextField
                    label="Data da consulta"
                    fullWidth
                    variant="outlined"
                    name="data"
                    required
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item md={6}>
              {/* Adicionando o campo de horário */}
              <TextField
                select
                label="Horário"
                fullWidth
                variant="outlined"
                name="horario"
                value={agenda.horario}
                onChange={handleInputChange}
                required
                style={{ textAlign: 'left' }}
              >
                {horariosDisponiveis.map((horario) => (
                  <MenuItem key={horario} value={horario}>
                    {horario}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6}>
              <TextField
                label="Nome completo"
                fullWidth
                variant="outlined"
                name="nome"
                value={agenda.nome}
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
                value={agenda.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item md={6}>
              <InputMask
                mask="(99)99999-9999"
                value={agenda.telefone}
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

          </Grid>

          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ width: '500px', marginTop: 32 }}
            >
              Confirmar agendamento
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Agendar;