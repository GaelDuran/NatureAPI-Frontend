const fs = require("fs");

const API_URL = process.env.API_URL || "";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || "";

const content = `
export const API_URL = "${API_URL}";
export const MAPBOX_TOKEN = "${MAPBOX_TOKEN}";
`;

fs.writeFileSync("src/environments/secret.env.ts", content);

console.log("secret.env.ts generado correctamente");