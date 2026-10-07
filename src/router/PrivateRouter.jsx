import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '../features/home/Home';
import Layout from '../components/layout/Layout';

export const PrivateRouter = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);
