import { ticketService } from "../dao/services/tickets.service.js"
import { cartService } from "../dao/services/carts.service.js"
import UserDTO from "../dao/DTO/userDTO.js"
import { ticketDTO } from "../dao/DTO/ticketDTO.js"
import crypto from "crypto"

class TicketController {

    async createTicket(req, res){
        const { cid } = req.params
        const usr = new UserDTO(req.user)
        try {
            const prodInCart = await cartService.getProductsByCartId(cid)
            const { prodInStock, prodWithOutStock } = await ticketDTO.verifyStock(prodInCart.products)

            let amount = ticketDTO.calculateAmount(prodInStock)

            const code = crypto.randomUUID()
            const purchase_datetime = new Date().toString()
            const newTicket = {code,
                               purchase_datetime,
                               amount,
                               purcharser: usr.email}

            const ticket = await ticketService.createTicket(newTicket)
            let deletedProducts

            if (prodInStock.length > 0) {
                deletedProducts = await ticketDTO.deletePurchasedProductsFromCart(
                    prodInStock,
                  cid
                )
              }

              if (prodInStock.length > 0) {
                req.logger.debug("Se creó el ticket", createdTicket)
                res.status(200).json({
                  status: "success",
                  payload: ticket,
                  prodWithOutStock,
                  deletedProducts,
                })
              } else {
                req.logger.error("Error al crear ticket", error)
                res.status(500).json({ message: "Productos sin stock" });
              }
            } catch (error) {
              req.logger.error("Error al crear ticket", error)
              res.status(500).json({ status: "Error al crear el ticket", error: error.message });
        }
    }

    async getTicketById(req, res){
        try {
            const cid = req.params.cid
            const ticket = ticketService.getTicketById(cid)
            req.logger.debug("Se obtuvo el ticket", ticket)
            res.status(200).json(ticket)
        } catch (error) {
          req.logger.error("Error al obtener ticket", error)
            res.status(500).send({ status: "Internal Server Error",  error: error.message})
        }
    }

}

export const ticketsController = new TicketController()