import { Box, Container, Typography } from '@mui/material';

import NavBar from '../navbar/NavBar';
import { TREKKIN_THEME } from '../../configs/theme';

const Layout = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: TREKKIN_THEME.layout.mainBg }}>
    <NavBar />

    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>

    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', py: 3 }}>
      <Container maxWidth={TREKKIN_THEME.layout.maxWidth}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Trekkin · Maqueta
        </Typography>
      </Container>
    </Box>
  </Box>
);

export default Layout;
