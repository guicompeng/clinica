import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

// Importe as imagens
import imagem1 from '../img/fundo.jpg';
import imagem2 from '../img/fundo2.jpeg';
import imagem3 from '../img/fundo3.png';

const Galeria = () => {
  // Array de URLs das imagens
  const imagens = [imagem1, imagem2, imagem3];

  return (
    <Box mt={4} mb={12}>
    <Container maxWidth="md" >
      {/* Título da página */}
      <Typography variant="h4" align="center" gutterBottom>
        Galeria de Fotos
      </Typography>

      {/* Carrossel de fotos */}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Carousel>
          {imagens.map((url, index) => (
            <Grid container justifyContent="center" key={index}>
              <img src={url} alt={`Imagem ${index + 1}`} style={{ maxWidth: '100%', height: '500px' }} />
            </Grid>
          ))}
        </Carousel>
      </Paper>
    </Container>
    </Box>
  );
};

export default Galeria;