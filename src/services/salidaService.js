import { TREKKINS } from '../mocks/trekkins';
import { simularLatencia } from './trekkinService';

// Microservicio de salidas (CRUD). Contrato esperado del BE:
//   GET    /salidas          -> Salida[]
//   POST   /salidas          -> Salida   body: { trekkinId, fecha: 'YYYY-MM-DD', hora: 'HH:mm', personas }
//   PUT    /salidas/:id      -> Salida
//   DELETE /salidas/:id      -> 204
// TODO: reemplazar por axiosInstance cuando exista el BE. Mientras tanto se guarda en memoria (se pierde al recargar).

let salidas = [];
let proximoId = 1;

const conTrekkin = (salida) => ({ ...salida, trekkin: TREKKINS.find((t) => t.id === salida.trekkinId) });

export const obtenerSalidas = async () => simularLatencia(salidas.map(conTrekkin), 300);

export const crearSalida = async ({ trekkinId, fecha, hora, personas }) => {
  const salida = { id: proximoId++, trekkinId, fecha, hora, personas };
  salidas = [...salidas, salida];
  return simularLatencia(conTrekkin(salida), 300);
};

export const actualizarSalida = async (id, cambios) => {
  salidas = salidas.map((s) => (s.id === id ? { ...s, ...cambios } : s));
  return simularLatencia(conTrekkin(salidas.find((s) => s.id === id)), 300);
};

export const eliminarSalida = async (id) => {
  salidas = salidas.filter((s) => s.id !== id);
  return simularLatencia(undefined, 300);
};
