const path = require('path');
const { writeFile } = require('fs').promises;
require('dotenv').config();
 
const requiredVars = ['API_URL', 'MAPBOX_TOKEN'];
for (const v of requiredVars) {
  if (!process.env[v]) throw new Error(`${v} debe estar definido en el archivo .env`);
}
 
const fileName = 'secret.env.ts';
const filePath = path.join(__dirname, 'src', 'environments', fileName);
 
let fileContent = '';
for (const v of requiredVars) {
  fileContent += `export const ${v} = "${process.env[v]}";\n`;
}
 
async function write() {
  try {
    await writeFile(filePath, fileContent, 'utf8');
    console.log(`${fileName} generado en ${filePath}`);
  } catch (err) {
    console.error('Error escribiendo archivo:', err);
  }
}
 
write();