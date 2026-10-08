import dayjs from 'dayjs';
import { simularLatencia } from './trekkinService';

// Microservicio orquestador de clima. El FE nunca llama a Open-Meteo directo: el BE recibe esto,
// consulta https://api.open-meteo.com/v1/forecast (daily=weather_code,temperature_2m_max,
// temperature_2m_min,precipitation_probability_max) y traduce el weather_code WMO a un estado propio.
//
// Contrato esperado del BE:
//   GET /clima?latitud=-31.98&longitud=-64.93&fecha=2026-10-18
//   -> { fecha, estado: 'soleado' | 'nublado' | 'lluvioso' | 'tormenta' | 'nieve', temperaturaMax, temperaturaMin, probabilidadLluvia }
//
// TODO: reemplazar por axiosInstance cuando exista el BE:
// export const obtenerPronostico = async (params) => (await axiosInstance.get('/clima', { params })).data;

// Open-Meteo pronostica hasta 16 días (hoy + 15).
export const DIAS_PRONOSTICO = 16;

export const fechaConPronostico = (fecha) => dayjs(fecha).isBefore(dayjs().startOf('day').add(DIAS_PRONOSTICO, 'day'));

const ESTADOS = ['soleado', 'soleado', 'nublado', 'nublado', 'lluvioso', 'tormenta', 'nieve'];

export const obtenerPronostico = async ({ latitud, longitud, fecha }) => {
  // Maqueta determinística: mismo trekking + misma fecha => mismo pronóstico.
  const semilla = Math.abs(Math.round(latitud * 100 + longitud * 10) + dayjs(fecha).date() * 7);
  const estado = ESTADOS[semilla % ESTADOS.length];
  const base = 28 + Math.round(latitud / 3); // más al sur, más frío
  const temperaturaMax = estado === 'nieve' ? Math.min(base - 10, 2) : base - (semilla % 6);

  return simularLatencia(
    {
      fecha,
      estado,
      temperaturaMax,
      temperaturaMin: temperaturaMax - 8 - (semilla % 5),
      probabilidadLluvia: { soleado: 5, nublado: 25, lluvioso: 80, tormenta: 90, nieve: 70 }[estado],
    },
    600,
  );
};
