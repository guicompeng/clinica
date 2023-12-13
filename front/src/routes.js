import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const routes = [
  {
    name: "Início",
    path: "/",
    icon: <HomeIcon />
  },
  {
    name: "Galeria de fotos",
    path: "/galeria",
    icon: <CameraAltIcon />
  },
  {
    name: "Novo endereço",
    path: "/novo-endereco",
    icon: <LocalShippingIcon />
  },
  {
    name: "Agendamento de consulta",
    path: "/agendar",
    icon: <CalendarMonthIcon />
  },
]
export default routes;
