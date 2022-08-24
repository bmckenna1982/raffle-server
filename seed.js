const knex = require('knex')({
    client: 'pg',
    connection:
      'postgresql://postgres@localhost:5432/raffletickets',
      // + '?ssl=true',
    debug: false
  });
  
  // let games = [];
  
  const tickets = require('./src/ticket-data');
  
  const clearTickets = () => {
    return knex.transaction(trx =>
      trx.raw(
        `TRUNCATE 
          tickets
        `
      )
        // .then(() =>
        //   Promise.all([
        //     trx.raw(`ALTER SEQUENCE rsvp_id_seq minvalue 0 START WITH 1`),
        //     trx.raw(`ALTER SEQUENCE schedule_id_seq minvalue 0 START WITH 1`),
        //     trx.raw(`SELECT setval('rsvp_id_seq', 0)`),
        //     trx.raw(`SELECT setval('schedule_id_seq', 0)`)
        //   ])
        // )
    )
  }
  
  console.log('tickets', tickets);

  const inserts = function () {
    const insertPromises = [];
    tickets.forEach(function (ticket) {
      insertPromises.push(knex('tickets')
        .insert({ ticketId: ticket.ticketNum, lastName: ticket.lastName, firstName:ticket.firstName })
      );
    });
    return Promise.all(insertPromises);
  };
  
  clearTickets()
    .then(() => {
      console.log('Table cleared')
    })
    .then(inserts)
    .then(() => {
      console.log('inserts done')
    })
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      db.destroy()
      console.log('error', error)
    })