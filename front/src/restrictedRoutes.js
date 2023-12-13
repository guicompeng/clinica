import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const restrictedRoutes = [
  {
    name: "Meus dados",
    path: "/perfil",
    icon: <HomeIcon />
  },
  {
    name: "Cadastrar PEP",
    path: "/pep",
    icon: <ContactMailIcon />
  },
  {
    name: "Novo Funcionário",
    path: "/novo-funcionario",
    icon: <PersonIcon />
  },
  {
    name: "Novo Paciente",
    path: "/novo-paciente",
    icon: <MedicalInformationIcon />
  },
  {
    name: "Listar Funcionários",
    path: "/listar-funcionarios",
    icon: <FormatListNumberedIcon />
  },
  {
    name: "Listar Pacientes",
    path: "/listar-pacientes",
    icon: <PeopleIcon />
  },
  {
    name: "Listar Endereços",
    path: "/listar-enderecos",
    icon: <LocalShippingIcon />
  },
  {
    name: "Todos Agendamentos",
    path: "/todos-agendamentos",
    icon: <ScheduleIcon />
  },
  {
    name: "Meus Agendamentos",
    path: "/meus-agendamentos",
    icon: <CalendarMonthIcon />,
    onlyDoctor: true
  },
]
export default restrictedRoutes;
