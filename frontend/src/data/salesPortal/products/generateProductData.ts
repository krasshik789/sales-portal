import type { IProduct } from "../../types/product.types";
import { getRandomEnumValue } from "../../../utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";

// функция стала асинхронной
export async function generateProductData(params?: Partial<IProduct>): Promise<IProduct> {
  // динамический импорт ESM-модуля Faker
  const { faker } = await import("@faker-js/faker");

  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}