export const environment = {
  /**
   * 🔧 Modo desarrollo
   * No existe environment de producción porque no tienes un backend hosteado.
   * Toda la aplicación usará este archivo siempre.
   */
  production: false,

  /**
   * 🌐 URL base del backend FastAPI en tu máquina local
   * Si lo cambias en el futuro (por ejemplo a Railway, Render, VPS o dominio propio),
   * solo modificas esta línea.
   */
  apiUrl: 'http://localhost:8000',
};
// // src/environments/environment.ts
// export const environment = {
//   production: true,
//   apiUrl: 'https://api.autismomochis.mx'
// };
