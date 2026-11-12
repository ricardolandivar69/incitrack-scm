(function (root) {
  'use strict';
  const ESTADOS = ['abierta', 'en-proceso', 'resuelta'];
  const PRIORIDADES = ['baja', 'media', 'alta'];

  function crearIncidencia(datos) {
    const titulo = String(datos.titulo || '').trim();
    const descripcion = String(datos.descripcion || '').trim();
    const estado = String(datos.estado || 'abierta');
    const prioridad = String(datos.prioridad || 'media');
    if (titulo.length < 4) throw new Error('El título debe tener al menos 4 caracteres.');
    if (titulo.length > 100) throw new Error('El título no puede superar 100 caracteres.');
    if (!ESTADOS.includes(estado)) throw new Error('Estado de incidencia no válido.');
    if (!PRIORIDADES.includes(prioridad)) throw new Error('Prioridad no válida.');
    return {
      id: 'INC-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6),
      titulo, descripcion, estado, prioridad,
      creado: new Date().toISOString()
    };
  }

  function resumen(incidencias) {
    const lista = Array.isArray(incidencias) ? incidencias : [];
    return {
      total: lista.length,
      abierta: lista.filter(i => i.estado === 'abierta').length,
      'en-proceso': lista.filter(i => i.estado === 'en-proceso').length,
      resuelta: lista.filter(i => i.estado === 'resuelta').length
    };
  }

  function filtrarPorEstado(incidencias, estado) {
    const lista = Array.isArray(incidencias) ? incidencias : [];
    if (!estado || estado === 'todos') return [...lista];
    return lista.filter(incidencia => incidencia.estado === estado);
  }

  const api = { crearIncidencia, resumen, filtrarPorEstado };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.IncidentCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
