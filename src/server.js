const knex = require('knex');
const app = require('./app');
const { PORT } = require('./config');

const db = knex({
  client: 'pg',
  // connection: 'postgresql://postgres@localhost:5432/raffletickets'
  connection: 'postgres://uhyrasferkvxrw:d21a4dae99c8af255f79870e30c2db621656fc5c0e04d1424b6ccbe6c27c6a2f@ec2-34-227-135-211.compute-1.amazonaws.com:5432/ddpftgei15dv7e?ssl=true'
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
})
