import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Galeria from './pages/Galeria';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import { Box } from '@mui/material';
import isLogged from './components/useUser';
import ListarFuncionarios from './pages/ListarFuncionarios';
import LoggedFooter from './components/LoggedFooter';
import ListarPacientes from './pages/ListarPacientes';
import ListarEnderecos from './pages/ListarEnderecos';
import ListarAgendamentos from './pages/ListarAgendamentos';
import ListarMeusAgendamentos from './pages/ListarMeusAgendamentos';
import NovoEndereco from './pages/NovoEndereco';
import Pep from './pages/Pep';
import NovoFuncionario from './pages/NovoFuncionario';
import NovoPaciente from './pages/NovoPaciente';
import Agendar from './pages/Agendar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/galeria",
    element: <Galeria />
  },
  {
    path: "/novo-endereco",
    element: <NovoEndereco />
  },
  {
    path: "/agendar",
    element: <Agendar />
  },
  {
    path: "/login",
    element: <Login />
  },

  // restricted
  {
    path: "/perfil",
    element: <Perfil />
  },
  {
    path: "/pep",
    element: <Pep />
  },
  {
    path: "/novo-funcionario",
    element: <NovoFuncionario />
  },
  {
    path: "/novo-paciente",
    element: <NovoPaciente />
  },
  {
    path: "/listar-funcionarios",
    element: <ListarFuncionarios />
  },
  {
    path: "/listar-pacientes",
    element: <ListarPacientes />
  },
  {
    path: "/listar-enderecos",
    element: <ListarEnderecos />
  },
  {
    path: "/todos-agendamentos",
    element: <ListarAgendamentos />
  },
  {
    path: "/meus-agendamentos",
    element: <ListarMeusAgendamentos />
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Box ml={isLogged() ? 30 : 0}>
      <RouterProvider router={router} />
      {isLogged() ? <LoggedFooter /> : <Footer />}
    </Box>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
