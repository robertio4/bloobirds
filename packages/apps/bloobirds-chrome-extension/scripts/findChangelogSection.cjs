// scripts/findChangelogSection.js

const { execSync } = require('child_process');

// Obtenemos el argumento de la versión desde la línea de comandos
const version = process.argv[2];

// Comando awk que queremos ejecutar
const awkCommand = `awk -v version="${version}" 'BEGIN { found=0 } /^## / { if (found) exit; if ($0 ~ version) { found=1 } } found { print }' CHANGELOG.md`;

// Ejecutamos el comando usando execSync para capturar la salida
try {
  const output = execSync(awkCommand, { encoding: 'utf-8' });
  console.log(output.trim()); // Imprimimos la salida del comando (sin espacios en blanco al final)
} catch (error) {
  console.error(`Error al ejecutar el comando awk: ${error}`);
  process.exit(1);
}
