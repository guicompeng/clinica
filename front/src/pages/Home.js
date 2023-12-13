import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import photo from '../img/fundo3.png';

// Estilos diretamente no JSX
const containerStyle = {
  paddingTop: 16,
};

const cardStyle = {
  maxWidth: 1500,
  margin: 'auto',
  marginBottom: 16,
};

const mediaStyle = {
  height: 500,
};

const Home = () => {
  return (
    <Container style={containerStyle}>
      <Card style={cardStyle}>
        <CardMedia
          component="img"
          alt="Cefet Saúde"
          height="140"
          image={photo}
          style={mediaStyle}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Clínica Cefet Saúde
          </Typography>
          <Typography variant="body1" paragraph>
            Descrição: A Clínica Integrada do CEFET é um espaço dedicado à saúde e bem-estar, oferecendo serviços médicos, odontológicos e psicológicos de qualidade para alunos e servidores da instituição. Nosso objetivo é proporcionar cuidados integrados e personalizados em um ambiente acolhedor.          </Typography>
          <Typography variant="body1" paragraph>
            Missão: Promover o desenvolvimento integral da comunidade acadêmica, focando na saúde física e mental. Oferecemos serviços de prevenção, diagnóstico e tratamento, com ênfase na educação em saúde e na promoção de estilos de vida saudáveis.
          </Typography>
          <Typography variant="body1" paragraph>
            Valores: Comprometimento com o Bem-Estar, Integridade, Acessibilidade e Inclusão, Excelência Profissional
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;