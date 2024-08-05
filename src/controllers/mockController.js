import { mockService } from "../dao/services/mocks.service.js"

class MockController {

    async createProduct(req, res) {
        try {
            const result = await mockService.getProducts()
            res.json({ status: "success", payload: result })
        } catch (error) {
            req.logger.error("Error al obtener productos", error)
            res.status(500).json({ error: error.message })
        }
    }

}

export const mockController = new MockController()