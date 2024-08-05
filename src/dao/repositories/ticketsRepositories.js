export default class TicketsRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTicket = async (ticket) => {
      return await this.dao.createTicket(ticket)
    }
  
    getTicketById = async (cid) => {
      return await this.dao.getTicketById(cid)
    }

  }
  