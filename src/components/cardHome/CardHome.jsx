import { Box, Button, Card, CardActions, CardContent, Chip, Rating, Stack, Typography } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PlaceIcon from '@mui/icons-material/Place';
import StraightenIcon from '@mui/icons-material/Straighten';
import { TREKKIN_THEME } from '../../configs/theme';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dayjs from 'dayjs';

const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);

const Dato = ({ icon: Icon, children }) => (
  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
    <Icon sx={{ fontSize: 18 }} />
    <Typography variant="body2">{children}</Typography>
  </Stack>
);

const CardHome = ({ trekkin, onVerDetalle }) => {
  const { nombre, provincia, dificultad, distanciaKm, desnivelM, duracion, precio, rating, proximaSalida, descripcion, gradiente } =
    trekkin;

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .2s, box-shadow .2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
      }}
    >
      {/* Placeholder de imagen hasta tener fotos reales */}
      <Box sx={{ position: 'relative', height: 160, background: gradiente, display: 'grid', placeItems: 'center' }}>
        <LandscapeIcon sx={{ fontSize: 72, color: 'rgba(255,255,255,.6)' }} />
        <Chip
          label={dificultad}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: TREKKIN_THEME.difficulty[dificultad],
            color: '#fff',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography variant="h6" component="h3" sx={{ lineHeight: 1.3 }}>
            {nombre}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mb: 1 }}>
          <PlaceIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
          <Typography variant="body2" color="text.secondary">
            {provincia}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Rating value={rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            {rating}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {descripcion}
        </Typography>

        <Stack direction="row" sx={{ flexWrap: 'wrap', columnGap: 2, rowGap: 0.5 }}>
          <Dato icon={StraightenIcon}>{distanciaKm} km</Dato>
          <Dato icon={TrendingUpIcon}>{desnivelM} m</Dato>
          <Dato icon={AccessTimeIcon}>{duracion}</Dato>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            Próxima salida: {dayjs(proximaSalida).format('D [de] MMMM')}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatearPrecio(precio)}
          </Typography>
        </Box>
        <Button variant="contained" size="small" onClick={() => onVerDetalle?.(trekkin)}>
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardHome;
