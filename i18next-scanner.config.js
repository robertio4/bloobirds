module.exports = {
  input: [
    './**/*.{js,jsx,ts,tsx}', // Rutas de archivos que quieres analizar
    '!./**/*.spec.{js,jsx,ts,tsx}',
    '!./i18n/**',
    '!**/node_modules/**',
  ],
  output: './', // Carpeta donde se generará el archivo JSON con las claves
  options: {
    debug: true, // Activa la salida de mensajes de depuración
    removeUnusedKeys: false, // Elimina automáticamente las claves no utilizadas del archivo JSON
    func: {
      list: ['t'], // Lista de funciones de traducción
    },
    trans: {
      component: 'Trans', // Nombre del componente de traducción si estás utilizando <Trans>
    },
    defaultValue: function (lng, ns, key) {
      if (lng === 'en') {
        // Return key as the default value for English language
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        /*return (
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
        );*/
      }
      // Return the string '__NOT_TRANSLATED__' for other languages
      return '__NOT_TRANSLATED__';
    },
    resource: {
      loadPath: 'packages/internationalization/src/{{lng}}.json',
      savePath: 'packages/internationalization/src/{{lng}}.json',
    },
  },
  transform: 'js', // Tipo de archivos a analizar (JavaScript en este caso)
};
