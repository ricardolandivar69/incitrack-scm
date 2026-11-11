# InciTrack - v1.0.0

Sistema de registro de incidencias creado para la asignatura **Gestión de la Configuración del Software**.

## Funciones
- Crear y listar incidencias, visualizar estadísticas y conservarlas en localStorage.
- Registro de título, descripción, estado y prioridad.
- Conteo por estado y almacenamiento local (solo en el navegador actual).
- Interfaz adaptable a celular y escritorio.

## Ejecutar
1. Descarga los archivos de esta etapa y extrae el ZIP.
2. Haz doble clic en `index.html` para abrir la aplicación. No hace falta instalar Node.js para usarla.
3. Completa el formulario y selecciona "Registrar incidencia".
4. Para ejecutar las pruebas, con Node.js 22 instalado, abre una terminal en la carpeta y escribe `npm test`.

## Despliegue automatizado
Archivo de flujo: `.github/workflows/despliegue.yml`.
En GitHub: `Settings > Pages > Build and deployment > Source: GitHub Actions`.
Cada push a `main` realiza pruebas y, si pasan, publica los archivos en GitHub Pages.
Cada pull request realiza las pruebas, pero no despliega.

## Estructura
- `index.html`: interfaz y formulario.
- `styles.css`: diseño visual.
- `app.js`: eventos, persistencia y presentación.
- `src/logic.js`: lógica comprobable con tests.
- `tests/`: pruebas automáticas con Node.js (sin librerías externas).
- `.github/workflows/despliegue.yml`: CI/CD con GitHub Actions.

## Limitaciones
Esta es una simulación académica: no dispone de base de datos ni sincroniza datos entre computadoras. Los registros se almacenan en `localStorage` y el servidor de GitHub Pages sirve solamente archivos estáticos.

## Equipo
Ricardo Landivar, Ángel Punina y Carlos Llivisupa.

## Versionado
Consulta `docs/RELEASE_NOTES.md`. Los tags y releases deben crearse en GitHub después de realizar los commits y pull requests reales.
