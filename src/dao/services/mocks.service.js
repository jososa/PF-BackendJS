import { mockRepository } from "../repositories/index.js"

class MockService {

    getProducts = async () => {
        try {
            return await mockRepository.getProducts()
        } catch (error) {
            return error
        }
    }

}

export const mockService = new MockService()