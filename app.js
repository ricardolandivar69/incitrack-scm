(function () {
  'use strict';
  const core = window.IncidentCore;
  const CLAVE = 'incitrack.registros.v1';
  const formulario = document.getElementById('incident-form');
  const lista = document.getElementById('incident-list');
  const mensaje = document.getElementById('notice');
  const contador = document.getElementById('incident-count');
  const nombresEstado = { abierta: 'Abierta', 'en-proceso': 'En proceso', resuelta: 'Resuelta' };
  const prioridades = { baja: 'Baja', media: 'Media', alta: 'Alta' };

  function obtenerGuardadas() {
    try {
      const leidas = JSON.parse(localStorage.getItem(CLAVE) || '[]');
      return Array.isArray(leidas) ? leidas : [];
    } catch (error) {
      console.warn('No fue posible leer los datos locales.', error);
      return [];
    }
  }
  let incidencias = obtenerGuardadas();

  function elemento(etiqueta, clase, texto) {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  }

  function pintarTarjeta(incidencia) {
    const tarjeta = elemento('article', 'incident');
    const fila = elemento('div', 'card-row');
    const titulo = elemento('h3', 'card-title', incidencia.titulo);
    const fecha = elemento('span', 'card-meta', new Date(incidencia.creado).toLocaleDateString('es-EC'));
    fila.append(titulo, fecha);
    tarjeta.append(fila);
    if (incidencia.descripcion) {
      tarjeta.append(elemento('p', 'card-description', incidencia.descripcion));
    }
    const badges = elemento('div', 'card-badges');
    badges.append(elemento('span', 'pill ' + incidencia.estado, nombresEstado[incidencia.estado] || 'Sin estado'));
    badges.append(elemento('span', 'pill', 'Prioridad ' + (prioridades[incidencia.prioridad] || 'Media')));
    badges.append(elemento('span', 'pill', incidencia.id));
    tarjeta.append(badges);
    return tarjeta;
  }

  function pintar() {
    const stats = core.resumen(incidencias);
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-open').textContent = stats.abierta;
    document.getElementById('stat-progress').textContent = stats['en-proceso'];
    document.getElementById('stat-done').textContent = stats.resuelta;
    let visibles = [...incidencias];
    const elegido = document.getElementById('filter-state').value;
    visibles = core.filtrarIncidencias(visibles, elegido);
    visibles.sort((a, b) => String(b.creado).localeCompare(String(a.creado)));
    contador.textContent = visibles.length + ' ' + (visibles.length === 1 ? 'incidencia' : 'incidencias');
    lista.replaceChildren();
    if (visibles.length === 0) {
      const vacio = elemento('div', 'empty');
      vacio.append(elemento('div', 'empty-icon', '✦'));
      vacio.append(elemento('strong', '', 'Sin incidencias para mostrar'));
      vacio.append(elemento('p', '', 'Registra una incidencia o cambia el filtro para consultar otros resultados.'));
      lista.append(vacio);
    } else {
      visibles.forEach(incidencia => lista.append(pintarTarjeta(incidencia)));
    }
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    try {
      const nueva = core.crearIncidencia({
        titulo: document.getElementById('title').value,
        descripcion: document.getElementById('description').value,
        estado: document.getElementById('status').value,
        prioridad: document.getElementById('priority').value
      });
      incidencias.push(nueva);
      localStorage.setItem(CLAVE, JSON.stringify(incidencias));
      formulario.reset();
      mensaje.textContent = 'Incidencia registrada correctamente.';
      pintar();
    } catch (error) {
      mensaje.textContent = error.message;
    }
  });

  document.getElementById('filter-state').addEventListener('change', pintar);
  pintar();
})();
