import { ticketsModel } from "../models/ticketsModel.js"
// import ticketService from "../../services/tickets.service.js"
// import cartsService from "../../services/carts.service.js"
// import UserDTO from "../../DTO/userDTO.js"
// import ticketDTO from "../../DTO/ticketDTO.js"
// import crypto from "crypto"

export default class TicketDao {

    async createTicket(ticket){
        try {
            let result = await ticketsModel.create(ticket)
            return result
        } catch (error) {
            return error
        }
    }

    async getTicketById(cid){
        try {
            let result = await ticketsModel.findById(cid)
            return result
        } catch (error) {
            return error
        }
    }
    // async createTicket(req, res){
    //     try {
    //         const newTicket = await ticketService.createTicket()
    //         res.status(201).send({ status: "Ticket creado", payload: newTicket })
    //     } catch (error) {
    //         res.status(500).send({ status: "Error al crear el ticket",  error: error.message })
    //     }
    // }

    // async getTicketById(req, res){
    //     try {
    //         const cid = req.params.cid
    //         const ticket = ticketService.getTicketById(cid)
    //         res.json(ticket)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send({ status: "Internal Server Error",  error: error.message})
    //     }
    // }

}

//export const ticketsManager = new TicketManager()