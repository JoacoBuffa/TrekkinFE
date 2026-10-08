import { obtenerDificultades, obtenerProvincias, obtenerTrekkinPorId, obtenerTrekkins } from '../services/trekkinService';

import { useCallback } from 'react';

const useTrekkins = () => {
  const obtenerTrekkinsServicio = useCallback(async (filtros) => {
    try {
      return await obtenerTrekkins(filtros);
    } catch (error) {
      console.error('Error en la consulta de Trekkins:', error);
      throw error;
    }
  }, []);

  const obtenerTrekkinPorIdServicio = useCallback(async (id) => {
    try {
      return await obtenerTrekkinPorId(id);
    } catch (error) {
      console.error('Error en la consulta del Trekkin:', error);
      throw error;
    }
  }, []);

  const obtenerProvinciasServicio = useCallback(async () => {
    try {
      return await obtenerProvincias();
    } catch (error) {
      console.error('Error en la consulta de Provincias:', error);
      throw error;
    }
  }, []);

  const obtenerDificultadesServicio = useCallback(async () => {
    try {
      return await obtenerDificultades();
    } catch (error) {
      console.error('Error en la consulta de Dificultades:', error);
      throw error;
    }
  }, []);

  return {
    obtenerTrekkins: obtenerTrekkinsServicio,
    obtenerTrekkinPorId: obtenerTrekkinPorIdServicio,
    obtenerProvincias: obtenerProvinciasServicio,
    obtenerDificultades: obtenerDificultadesServicio,
  };
};

export default useTrekkins;
