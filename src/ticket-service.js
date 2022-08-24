const TicketService = {
    getTickets(db) {
        return db
            .from('tickets')
            .select('*');
    }
}

module.exports = TicketService;