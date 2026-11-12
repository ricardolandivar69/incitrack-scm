const test = require('node:test');
const assert = require('node:assert/strict');
const { crearIncidencia, resumen, filtrarIncidencias } = require('../src/logic.js');

test('crea una incidencia con los campos esenciales', () => {
  const item = crearIncidencia({ titulo: 'Error de acceso', descripcion: 'No permite entrar', estado: 'abierta', prioridad: 'alta' });
  assert.equal(item.titulo, 'Error de acceso');
  assert.equal(item.estado, 'abierta');
  assert.match(item.id, /^INC-/);
});
test('rechaza incidencias con título demasiado corto', () => {
  assert.throws(() => crearIncidencia({ titulo: 'ab', estado: 'abierta' }), /4 caracteres/);
});
test('resume el número de incidencias por estado', () => {
  const datos = [{estado: 'abierta'}, {estado: 'resuelta'}, {estado: 'resuelta'}];
  assert.deepEqual(resumen(datos), {total: 3, abierta: 1, 'en-proceso': 0, resuelta: 2});
});

test('el filtro encuentra incidencias abiertas', () => {
  const datos = [{estado: 'abierta'}, {estado: 'resuelta'}];
  assert.equal(filtrarIncidencias(datos, 'abierta').length, 1);
});

test('el filtro Todos muestra todos los registros', () => {
  const datos = [{estado: 'abierta'}, {estado: 'resuelta'}];
  assert.equal(filtrarIncidencias(datos, 'todos').length, 2);
});
