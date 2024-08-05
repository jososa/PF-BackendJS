export default class MockRepository {

    constructor(dao) {
        this.dao = dao
    }

    getProducts = async () => {
        try {
            return await this.dao.getProducts()
        } catch (error) {
            return error
        }
    }

}