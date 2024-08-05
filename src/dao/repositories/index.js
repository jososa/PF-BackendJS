import Mock from "../mongoDB/classes/mockDao.js"
import MockRepository from "../repositories/mocksRepositories.js"
import ProductRepository from "../repositories/productsRepositories.js"
import CartRepository from "../repositories/cartsRepositories.js"
import UserRepository from "../repositories/usersRepositories.js"
import MessageRepository from "../repositories/messagesRepositories.js"
import TicketRepository from "../repositories/ticketsRepositories.js"
import Product from "../mongoDB/classes/productDao.js"
import Cart from "../mongoDB/classes/cartDao.js"
import Message from "../mongoDB/classes/messageDao.js"
import Ticket from "../mongoDB/classes/ticketDao.js"
import User from "../mongoDB/classes/userDao.js"

const productDAO = new Product()
const cartDAO = new Cart()
const userDAO = new User()
const messageDAO = new Message()
const ticketDAO = new Ticket()
const mockDao = new Mock()

export const productRepository = new ProductRepository(productDAO)
export const cartRepository = new CartRepository(cartDAO)
export const userRepository = new UserRepository(userDAO)
export const messageRepository = new MessageRepository(messageDAO)
export const ticketRepository = new TicketRepository(ticketDAO)
export const mockRepository = new MockRepository(mockDao)