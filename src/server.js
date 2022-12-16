const knex = require('knex');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  // connection: 'postgresql://postgres@localhost:5432/raffletickets'
  connection: {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} with ${DATABASE_URL}`);
})
