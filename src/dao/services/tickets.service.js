import { ticketRepository } from "../repositories/index.js"

class TicketsService{
    createTicket = async (ticket) => {
        try {
            return await ticketRepository.createTicket(ticket)
        } catch (error) {
            return error
        }
    }

    getTicketByID = async (id) => {
        try {
            return await ticketRepository.getTicketByID(id)
        } catch (error) {
            return error
        }
    }
}

export const ticketService = new TicketsService()