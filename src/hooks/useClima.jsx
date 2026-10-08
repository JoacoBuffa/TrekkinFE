import { obtenerPronostico } from '../services/climaService';

import { useCallback } from 'react';

const useClima = () => {
  const obtenerPronosticoServicio = useCallback(async (params) => {
    try {
      return await obtenerPronostico(params);
    } catch (error) {
      console.error('Error en la consulta del Pronóstico:', error);
      throw error;
    }
  }, []);

  return {
    obtenerPronostico: obtenerPronosticoServicio,
  };
};

export default useClima;
