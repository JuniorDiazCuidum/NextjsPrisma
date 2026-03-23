require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL no encontrada en .env');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  await sql.query('CREATE TABLE IF NOT EXISTS comments (comment TEXT);');
  console.log('Tabla `comments` creada o ya existía.');
}

main().catch((err) => {
  console.error('Error ejecutando el script:', err);
  process.exit(1);
});
