const test = require('node:test');
const assert = require('node:assert/strict');
const { crearIncidencia, resumen, filtrarPorEstado } = require('../src/logic.js');

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

test('muestra todas las incidencias cuando no se aplica un filtro', () => {
  const datos = [{estado: 'abierta'}, {estado: 'en-proceso'}];
  assert.deepEqual(filtrarPorEstado(datos, 'todos'), datos);
});

test('filtra incidencias abiertas y en proceso', () => {
  const datos = [
    {id: 'INC-1', estado: 'abierta'},
    {id: 'INC-2', estado: 'en-proceso'},
    {id: 'INC-3', estado: 'abierta'}
  ];
  assert.deepEqual(filtrarPorEstado(datos, 'abierta').map(item => item.id), ['INC-1', 'INC-3']);
  assert.deepEqual(filtrarPorEstado(datos, 'en-proceso').map(item => item.id), ['INC-2']);
});
