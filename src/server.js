const knex = require('knex');
const app = require('./app');
const { PORT } = require('./config');

const db = knex({
  client: 'pg',
  connection: 'postgresql://postgres@localhost:5432/raffletickets'
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})
