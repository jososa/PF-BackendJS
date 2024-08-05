import { fakerES as faker } from "@faker-js/faker"

export const createProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url({
      height: 400,
      width: 400,
    }),
    code: faker.commerce.isbn(),
    stock: faker.number.int({ min: 0, max: 100 }),
    status: faker.datatype.boolean({ probability: 0.9 }),
  }
}
