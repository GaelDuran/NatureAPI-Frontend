const path = require('path');
const { writeFile } = require('fs').promises;
require('dotenv').config();

const requireVars = ['API_URL', 'MAPBOX_TOKEN'];
for (const v of requireVars) {
    if (!process.env[v]) throw new Error(`${v} debe estar definido en el archivo .env`);
}

const fileName = 'secret.env.ts';
const filePath = path.join(__dirname, 'src', 'environments', fileName);

// Generar contenido del archivo
const content = `export const environment = {
  apiUrl: '${process.env.API_URL}',
  mapboxToken: '${process.env.MAPBOX_TOKEN}'
};`;

writeFile(filePath, content)
  .then(() => console.log(`✓ ${fileName} creado exitosamente`))
  .catch(err => console.error(`✗ Error creando ${fileName}:`, err));