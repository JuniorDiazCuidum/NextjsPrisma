require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function main() {
  const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (!url) {
    console.error('ERROR: No DATABASE_URL or DATABASE_URL_UNPOOLED in .env');
    process.exit(1);
  }

  const sql = neon(url);
  try {
    const rows = await sql.query('SELECT table_schema, table_name FROM information_schema.tables WHERE table_name = $1', ['comments']);
    if (rows.length === 0) {
      console.log('La tabla `comments` NO existe en esta base de datos.');
    } else {
      console.log('La tabla `comments` existe en el esquema(s):', rows.map(r => r.table_schema).join(', '));
      const data = await sql.query('SELECT * FROM comments');
      console.log('Contenido de `comments` (primeras 50 filas):');
      console.table(data.slice(0,50));
    }
  } catch (err) {
    console.error('Error al consultar la base de datos:', err.message || err);
    process.exit(1);
  }
}

main();
