import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';

const CardInfo = ({ icon: Icon, valor, titulo, color = 'primary' }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar variant="rounded" sx={{ bgcolor: `${color}.main`, width: 48, height: 48 }}>
          <Icon />
        </Avatar>
        <div>
          <Typography variant="h5">{valor}</Typography>
          <Typography variant="body2" color="text.secondary">
            {titulo}
          </Typography>
        </div>
      </Stack>
    </CardContent>
  </Card>
);

export default CardInfo;
