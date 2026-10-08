import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '../features/home/Home';
import Layout from '../components/layout/Layout';
import MisSalidas from '../features/salidas/MisSalidas';
import TrekkinDetalle from '../features/trekkin/TrekkinDetalle';

export const PrivateRouter = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trekkin/:id" element={<TrekkinDetalle />} />
      <Route path="/mis-salidas" element={<MisSalidas />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);
