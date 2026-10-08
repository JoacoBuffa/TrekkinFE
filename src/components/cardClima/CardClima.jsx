import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import dayjs from 'dayjs';

const CLIMA_CONFIG = {
  soleado: {
    label: 'Soleado',
    icon: WbSunnyIcon,
    gradiente: 'linear-gradient(135deg, #F2A93B 0%, #FBE3A6 100%)',
    consejo: 'Llevá protector solar, gorra y agua extra.',
  },
  nublado: {
    label: 'Nublado',
    icon: CloudIcon,
    gradiente: 'linear-gradient(135deg, #7D8A96 0%, #C9D2DA 100%)',
    consejo: 'Buen día para caminar. Sumá una capa de abrigo.',
  },
  lluvioso: {
    label: 'Lluvioso',
    icon: UmbrellaIcon,
    gradiente: 'linear-gradient(135deg, #3A6EA5 0%, #A7C7E7 100%)',
    consejo: 'Llevá campera impermeable y cubre mochila.',
  },
  tormenta: {
    label: 'Tormenta',
    icon: ThunderstormIcon,
    gradiente: 'linear-gradient(135deg, #3D3F58 0%, #8E90AE 100%)',
    consejo: 'Se recomienda reprogramar la salida.',
  },
  nieve: {
    label: 'Nieve',
    icon: AcUnitIcon,
    gradiente: 'linear-gradient(135deg, #6E9CC0 0%, #E6F0F7 100%)',
    consejo: 'Requiere equipo de montaña invernal.',
  },
};

const CardClima = ({ pronostico }) => {
  const { fecha, estado, temperaturaMax, temperaturaMin, probabilidadLluvia } = pronostico;
  const { label, icon: Icon, gradiente, consejo } = CLIMA_CONFIG[estado] ?? CLIMA_CONFIG.nublado;

  return (
    <Card variant="outlined">
      {/* Placeholder de imagen hasta tener fotos reales */}
      <Box sx={{ position: 'relative', height: 140, background: gradiente, display: 'grid', placeItems: 'center' }}>
        <Icon sx={{ fontSize: 72, color: 'rgba(255,255,255,.75)' }} />
        <Chip
          label={label}
          size="small"
          sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(0,0,0,.35)', color: '#fff' }}
        />
      </Box>

      <CardContent>
        <Typography variant="caption" color="text.secondary">
          Pronóstico para el {dayjs(fecha).format('dddd D [de] MMMM')}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', my: 1 }}>
          <Typography variant="h4">{temperaturaMax}°</Typography>
          <Typography variant="h6" color="text.secondary">
            {temperaturaMin}°
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
            <WaterDropIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{probabilidadLluvia}%</Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {consejo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardClima;
