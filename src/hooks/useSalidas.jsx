import { actualizarSalida, crearSalida, eliminarSalida, obtenerSalidas } from '../services/salidaService';

import { useCallback } from 'react';

const useSalidas = () => {
  const obtenerSalidasServicio = useCallback(async () => {
    try {
      return await obtenerSalidas();
    } catch (error) {
      console.error('Error en la consulta de Salidas:', error);
      throw error;
    }
  }, []);

  const crearSalidaServicio = useCallback(async (salida) => {
    try {
      return await crearSalida(salida);
    } catch (error) {
      console.error('Error al crear la Salida:', error);
      throw error;
    }
  }, []);

  const actualizarSalidaServicio = useCallback(async (id, cambios) => {
    try {
      return await actualizarSalida(id, cambios);
    } catch (error) {
      console.error('Error al actualizar la Salida:', error);
      throw error;
    }
  }, []);

  const eliminarSalidaServicio = useCallback(async (id) => {
    try {
      return await eliminarSalida(id);
    } catch (error) {
      console.error('Error al eliminar la Salida:', error);
      throw error;
    }
  }, []);

  return {
    obtenerSalidas: obtenerSalidasServicio,
    crearSalida: crearSalidaServicio,
    actualizarSalida: actualizarSalidaServicio,
    eliminarSalida: eliminarSalidaServicio,
  };
};

export default useSalidas;
