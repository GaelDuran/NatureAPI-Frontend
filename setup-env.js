const path = require('path');
const { writeFile, mkdir } = require('fs').promises;
require('dotenv').config();

const requireVars = ['API_URL', 'MAPBOX_TOKEN'];

console.log('Variables disponibles:', process.env);

for (const v of requireVars) {
    if (!process.env[v]) {
        console.error(`✗ ${v} no está definido`);
        process.exit(1);
    }
}

const dirPath = path.join(__dirname, 'src', 'environments');
const filePath = path.join(dirPath, 'secret.env.ts');

const content = `export const environment = {
  apiUrl: '${process.env.API_URL}',
  mapboxToken: '${process.env.MAPBOX_TOKEN}'
};
`;

mkdir(dirPath, { recursive: true })
  .then(() => writeFile(filePath, content))
  .then(() => console.log(`✓ secret.env.ts creado en ${filePath}`))
  .catch(err => {
    console.error(`✗ Error:`, err.message);
    process.exit(1);
  });