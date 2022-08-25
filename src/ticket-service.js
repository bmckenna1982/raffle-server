const TicketService = {
    getTickets(db) {
        return db
            .from('tickets')
            .select('*');
    },
    addTicket(db, newTicket) {
        return db
            .insert(newTicket)
            .into('tickets')
            .returning('*')            
        }
}

module.exports = TicketService;