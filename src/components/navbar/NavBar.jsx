import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import LandscapeIcon from '@mui/icons-material/Landscape';
import MenuIcon from '@mui/icons-material/Menu';
import { TREKKIN_THEME } from '../../configs/theme';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Mis salidas', to: '/mis-salidas' },
];

const Logo = ({ onClick }) => (
  <Box onClick={onClick} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
    <LandscapeIcon color="primary" sx={{ fontSize: 32 }} />
    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 0.5 }}>
      Trekkin
    </Typography>
  </Box>
);

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: TREKKIN_THEME.topbar.bg,
        color: TREKKIN_THEME.topbar.color,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={TREKKIN_THEME.layout.maxWidth}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <IconButton
            edge="start"
            aria-label="Abrir menú"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Logo onClick={() => navigate('/')} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1, ml: 4 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end
                color="inherit"
                sx={{
                  color: 'text.secondary',
                  '&.active': { color: 'primary.main', bgcolor: 'action.hover' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button variant="text" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              Ingresar
            </Button>
            <Button variant="contained">Registrarse</Button>
          </Box>
        </Toolbar>
      </Container>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <Box sx={{ p: 2 }}>
            <Logo onClick={() => navigate('/')} />
          </Box>
          <Divider />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                end
                sx={{ '&.active': { color: 'primary.main', bgcolor: 'action.selected' } }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
