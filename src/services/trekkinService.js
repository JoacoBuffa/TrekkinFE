import { DIFICULTADES, PROVINCIAS, TREKKINS } from '../mocks/trekkins';

// TODO: reemplazar por llamadas reales con axiosInstance cuando exista el BE, p. ej.:
// import axiosInstance from './axiosConfig';
// export const obtenerTrekkins = async (filtros) => (await axiosInstance.get('/trekkins', { params: filtros })).data;

const simularLatencia = (data, ms = 400) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const obtenerTrekkins = async ({ provincia, dificultad } = {}) => {
  const resultado = TREKKINS.filter(
    (t) => (!provincia || t.provincia === provincia) && (!dificultad || t.dificultad === dificultad),
  );
  return simularLatencia(resultado);
};

export const obtenerProvincias = async () => simularLatencia(PROVINCIAS, 150);

export const obtenerDificultades = async () => simularLatencia(DIFICULTADES, 150);
