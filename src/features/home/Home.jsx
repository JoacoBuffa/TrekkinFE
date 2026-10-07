import { Alert, Box, Button, Container, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CardHome from '../../components/cardHome/CardHome';
import CardInfo from '../trekkin/components/cardInfo/CardInfo';
import ComboBox from '../trekkin/components/combobox/ComboBox';
import EventIcon from '@mui/icons-material/Event';
import HikingIcon from '@mui/icons-material/Hiking';
import MapIcon from '@mui/icons-material/Map';
import StarIcon from '@mui/icons-material/Star';
import { TREKKIN_THEME } from '../../configs/theme';
import useTrekkins from '../../hooks/useTrekkins';

const Home = () => {
  const { obtenerTrekkins, obtenerProvincias, obtenerDificultades } = useTrekkins();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [provincias, setProvincias] = useState([]);
  const [dificultades, setDificultades] = useState([]);
  const [provincia, setProvincia] = useState(null);
  const [dificultad, setDificultad] = useState(null);

  useEffect(() => {
    Promise.all([obtenerProvincias(), obtenerDificultades()])
      .then(([provs, difs]) => {
        setProvincias(provs);
        setDificultades(difs);
      })
      .catch(() => setError('No se pudieron cargar los filtros.'));
  }, [obtenerProvincias, obtenerDificultades]);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await obtenerTrekkins({ provincia, dificultad }));
    } catch {
      setError('No se pudieron cargar los trekkings.');
    } finally {
      setLoading(false);
    }
  }, [obtenerTrekkins, provincia, dificultad]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const limpiarFiltros = () => {
    setProvincia(null);
    setDificultad(null);
  };

  const stats = useMemo(() => {
    const promedio = data.length ? data.reduce((acc, t) => acc + t.rating, 0) / data.length : 0;
    return {
      cantidad: data.length,
      provincias: new Set(data.map((t) => t.provincia)).size,
      kmTotales: data.reduce((acc, t) => acc + t.distanciaKm, 0),
      ratingPromedio: promedio.toFixed(1),
    };
  }, [data]);

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${TREKKIN_THEME.colors.primaryDarker} 0%, ${TREKKIN_THEME.colors.primaryLight} 100%)`,
          color: 'primary.contrastText',
          pt: { xs: 6, md: 10 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth={TREKKIN_THEME.layout.maxWidth}>
          <Typography variant="overline" sx={{ opacity: 0.85, letterSpacing: 2 }}>
            Salidas guiadas por Argentina
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 32, md: 48 }, maxWidth: 640, mb: 2 }}>
            Encontrá tu próximo trekking
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 560 }}>
            Explorá rutas, compará dificultades y sumate a una salida grupal con guías certificados.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth={TREKKIN_THEME.layout.maxWidth} sx={{ pb: 8 }}>
        {/* Buscador */}
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mt: { xs: -6, md: -8 }, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <ComboBox
                label="Provincia"
                placeholder="Todas"
                options={provincias}
                value={provincia}
                onChange={setProvincia}
                loading={!provincias.length}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <ComboBox
                label="Dificultad"
                placeholder="Todas"
                options={dificultades}
                value={dificultad}
                onChange={setDificultad}
                loading={!dificultades.length}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={limpiarFiltros}
                disabled={!provincia && !dificultad}
                sx={{ height: 56 }}
              >
                Limpiar filtros
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Resumen */}
        <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <CardInfo icon={HikingIcon} valor={stats.cantidad} titulo="Trekkings" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <CardInfo icon={MapIcon} valor={stats.provincias} titulo="Provincias" color="secondary" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <CardInfo icon={EventIcon} valor={`${stats.kmTotales} km`} titulo="Para caminar" />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <CardInfo icon={StarIcon} valor={stats.ratingPromedio} titulo="Rating promedio" color="secondary" />
          </Grid>
        </Grid>

        {/* Listado */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Próximas salidas
          </Typography>
          {!loading && (
            <Typography variant="body2" color="text.secondary">
              {data.length} resultado{data.length === 1 ? '' : 's'}
            </Typography>
          )}
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton variant="rounded" height={380} />
                </Grid>
              ))
            : data.map((trekkin) => (
                <Grid key={trekkin.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <CardHome trekkin={trekkin} onVerDetalle={(t) => console.log('Ver detalle', t)} />
                </Grid>
              ))}
        </Grid>

        {!loading && !error && data.length === 0 && (
          <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No encontramos trekkings con esos filtros
            </Typography>
            <Button onClick={limpiarFiltros}>Ver todos</Button>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default Home;
