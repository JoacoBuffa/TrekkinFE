import { Alert, Box, Button, Card, CardContent, Container, IconButton, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import PlaceIcon from '@mui/icons-material/Place';
import { TREKKIN_THEME } from '../../configs/theme';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useSalidas from '../../hooks/useSalidas';

const Dato = ({ icon: Icon, children }) => (
  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
    <Icon sx={{ fontSize: 18 }} />
    <Typography variant="body2">{children}</Typography>
  </Stack>
);

const MisSalidas = () => {
  const navigate = useNavigate();
  const { obtenerSalidas, eliminarSalida } = useSalidas();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await obtenerSalidas());
    } catch {
      setError('No se pudieron cargar tus salidas.');
    } finally {
      setLoading(false);
    }
  }, [obtenerSalidas]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const cancelar = async (id) => {
    try {
      await eliminarSalida(id);
      setData((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError('No se pudo cancelar la salida.');
    }
  };

  return (
    <Container maxWidth={TREKKIN_THEME.layout.maxWidth} sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Mis salidas
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rounded" height={96} />)
          : data.map(({ id, trekkin, fecha, hora, personas }) => (
              <Card key={id} variant="outlined" sx={{ display: 'flex' }}>
                <Box sx={{ width: 12, flexShrink: 0, background: trekkin.gradiente }} />
                <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate(`/trekkin/${trekkin.id}`)}>
                    <Typography variant="h6">{trekkin.nombre}</Typography>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', columnGap: 2, rowGap: 0.5, mt: 0.5 }}>
                      <Dato icon={PlaceIcon}>{trekkin.provincia}</Dato>
                      <Dato icon={EventIcon}>{dayjs(fecha).format('D [de] MMMM YYYY')}</Dato>
                      <Dato icon={AccessTimeIcon}>{hora} hs</Dato>
                      <Dato icon={GroupIcon}>
                        {personas} persona{personas === 1 ? '' : 's'}
                      </Dato>
                    </Stack>
                  </Box>
                  <Tooltip title="Cancelar salida">
                    <IconButton color="error" onClick={() => cancelar(id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
      </Stack>

      {!loading && !error && data.length === 0 && (
        <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Todavía no reservaste ninguna salida
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Buscar trekkings
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default MisSalidas;
