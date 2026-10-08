import { Alert, Box, Button, Chip, Container, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DIAS_PRONOSTICO, fechaConPronostico } from '../../services/climaService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardClima from '../../components/cardClima/CardClima';
import ComboBox from './components/combobox/ComboBox';
import LandscapeIcon from '@mui/icons-material/Landscape';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import StraightenIcon from '@mui/icons-material/Straighten';
import { TREKKIN_THEME } from '../../configs/theme';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import useClima from '../../hooks/useClima';
import useSalidas from '../../hooks/useSalidas';
import useTrekkins from '../../hooks/useTrekkins';

const OPCIONES_PERSONAS = Array.from({ length: 12 }, (_, i) => i + 1);

const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(valor);

const formatearCoordenada = (valor, positivo, negativo) => `${Math.abs(valor).toFixed(4)}° ${valor >= 0 ? positivo : negativo}`;

const Dato = ({ icon: Icon, children }) => (
  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
    <Icon sx={{ fontSize: 18 }} />
    <Typography variant="body2">{children}</Typography>
  </Stack>
);

const TrekkinDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerTrekkinPorId } = useTrekkins();
  const { obtenerPronostico } = useClima();
  const { crearSalida } = useSalidas();

  const [trekkin, setTrekkin] = useState(null);
  const [error, setError] = useState(null);

  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [personas, setPersonas] = useState(null);

  const [pronostico, setPronostico] = useState(null);
  const [cargandoClima, setCargandoClima] = useState(false);
  const [errorClima, setErrorClima] = useState(null);

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    obtenerTrekkinPorId(id)
      .then(setTrekkin)
      .catch(() => setError('No encontramos el trekking.'));
  }, [id, obtenerTrekkinPorId]);

  // Al elegir una fecha se consulta automáticamente el pronóstico al BE.
  const fechaConsulta = fecha?.isValid() ? fecha.format('YYYY-MM-DD') : null;
  const hayPronostico = fechaConsulta && fechaConPronostico(fechaConsulta);

  useEffect(() => {
    setPronostico(null);
    setErrorClima(null);
    if (!trekkin || !hayPronostico) return;

    let vigente = true;
    setCargandoClima(true);
    obtenerPronostico({ latitud: trekkin.latitud, longitud: trekkin.longitud, fecha: fechaConsulta })
      .then((data) => vigente && setPronostico(data))
      .catch(() => vigente && setErrorClima('No se pudo obtener el pronóstico.'))
      .finally(() => vigente && setCargandoClima(false));

    // Si el usuario cambia de fecha antes de que vuelva la respuesta, se descarta la anterior.
    return () => {
      vigente = false;
    };
  }, [trekkin, fechaConsulta, hayPronostico, obtenerPronostico]);

  const reservar = async () => {
    setGuardando(true);
    try {
      await crearSalida({ trekkinId: trekkin.id, fecha: fechaConsulta, hora: hora.format('HH:mm'), personas });
      navigate('/mis-salidas');
    } catch {
      setError('No se pudo reservar la salida.');
      setGuardando(false);
    }
  };

  if (error && !trekkin) {
    return (
      <Container maxWidth={TREKKIN_THEME.layout.maxWidth} sx={{ py: 6 }}>
        <Alert severity="error" action={<Button onClick={() => navigate('/')}>Volver</Button>}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!trekkin) {
    return (
      <Container maxWidth={TREKKIN_THEME.layout.maxWidth} sx={{ py: 4 }}>
        <Skeleton variant="rounded" height={260} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" height={320} />
      </Container>
    );
  }

  const { nombre, provincia, dificultad, distanciaKm, desnivelM, duracion, precio, descripcion, gradiente, latitud, longitud } =
    trekkin;
  const puedeReservar = fechaConsulta && hora?.isValid() && personas && !guardando;

  return (
    <>
      {/* Cabecera */}
      <Box sx={{ position: 'relative', height: { xs: 200, md: 260 }, background: gradiente, display: 'grid', placeItems: 'center' }}>
        <LandscapeIcon sx={{ fontSize: 120, color: 'rgba(255,255,255,.5)' }} />
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(255,255,255,.85)', '&:hover': { bgcolor: '#fff' } }}
        >
          Volver
        </Button>
      </Box>

      <Container maxWidth={TREKKIN_THEME.layout.maxWidth} sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Información */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip label={dificultad} size="small" sx={{ bgcolor: TREKKIN_THEME.difficulty[dificultad], color: '#fff', mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {nombre}
            </Typography>

            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mb: 2 }}>
              <PlaceIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
              <Typography variant="body1" color="text.secondary">
                {provincia}
              </Typography>
            </Stack>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {descripcion}
            </Typography>

            <Stack direction="row" sx={{ flexWrap: 'wrap', columnGap: 3, rowGap: 1, mb: 3 }}>
              <Dato icon={StraightenIcon}>{distanciaKm} km</Dato>
              <Dato icon={TrendingUpIcon}>{desnivelM} m de desnivel</Dato>
              <Dato icon={AccessTimeIcon}>{duracion}</Dato>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MyLocationIcon color="primary" />
              <Box>
                <Typography variant="subtitle2">Ubicación del punto de partida</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  {formatearCoordenada(latitud, 'N', 'S')}, {formatearCoordenada(longitud, 'E', 'O')}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Reserva */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Armá tu salida
              </Typography>

              <Stack spacing={2}>
                <DatePicker
                  label="Fecha de salida"
                  value={fecha}
                  onChange={setFecha}
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TimePicker
                  label="Horario de salida"
                  value={hora}
                  onChange={setHora}
                  ampm={false}
                  minutesStep={15}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <ComboBox
                  label="Cantidad de personas"
                  options={OPCIONES_PERSONAS}
                  value={personas}
                  onChange={setPersonas}
                  getOptionLabel={(n) => `${n} persona${n === 1 ? '' : 's'}`}
                />

                {/* Clima: se habilita al elegir fecha */}
                {cargandoClima && <Skeleton variant="rounded" height={260} />}
                {pronostico && <CardClima pronostico={pronostico} />}
                {errorClima && <Alert severity="warning">{errorClima}</Alert>}
                {fechaConsulta && !hayPronostico && (
                  <Alert severity="info">
                    El pronóstico está disponible hasta {DIAS_PRONOSTICO} días antes de la salida. Volvé más cerca de la fecha
                    para verlo.
                  </Alert>
                )}

                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', pt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total{personas ? ` (${personas} × ${formatearPrecio(precio)})` : ''}
                  </Typography>
                  <Typography variant="h6">{formatearPrecio(precio * (personas ?? 1))}</Typography>
                </Stack>

                {error && <Alert severity="error">{error}</Alert>}

                <Button variant="contained" size="large" disabled={!puedeReservar} onClick={reservar}>
                  {guardando ? 'Reservando...' : 'Reservar salida'}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TrekkinDetalle;
