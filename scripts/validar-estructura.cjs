const fs = require('node:fs');
const assert = require('node:assert/strict');
for (const ruta of ['index.html', 'styles.css', 'app.js', 'src/logic.js', 'README.md']) {
  assert.ok(fs.existsSync(ruta), `Falta el archivo requerido: ${ruta}`);
}
const html = fs.readFileSync('index.html', 'utf8');
for (const id of ['incident-form', 'incident-list', 'title', 'status', 'priority']) {
  assert.ok(html.includes(`id="${id}"`), `Falta el elemento #${id}`);
}
assert.ok(html.includes('src/logic.js'), 'El HTML debe cargar la lógica del sistema');
console.log('Estructura estática validada.');
