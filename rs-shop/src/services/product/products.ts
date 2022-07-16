import { Client, ClientConfig } from "pg";
import { Product } from "@models/product";
import { config } from "@services/config";

class Products {
  private readonly config: ClientConfig;
  private client: Client;

  constructor(clientConfig: ClientConfig) {
    this.config = clientConfig || config;
  }

  async connect(): Promise<void> {
    this.client = new Client(this.config)
    await this.client.connect()
  }

  async getProductsList(): Promise<Product[]> {
    try {
      await this.connect();
      const { rows: products } = await this.client.query(`
      select id, count, title, description, price
      from stocks, products
      where products.id = stocks.product_id
    `);

      return products;
    } finally {
      await this.close();
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      await this.connect();

      const { rows: products } = await this.client.query(`
      select id, count, title, description, price
      from stocks, products
      where products.id = stocks.product_id and
      products.id = '${id}'
    `);

      return products?.length ? products[0] : null;
    } finally {
      await this.close();
    }
  }

  async createProduct(product: Product): Promise<string> {
    try {
      await this.connect();

      await this.client.query("BEGIN");
      const { rows } = await this.client.query(`
        insert into products ( title, description, price) values
            ('${product.title}', '${product.description ?? ""}', '${
        product.price
      }')
        returning id
    `);

      const { id } = rows[0];

      await this.client.query(`
        insert into stocks (product_id, count) values ('${id}', '${product.count}')
    `);
      await this.client.query("COMMIT");

      return id;
    } catch (e) {
      await this.client.query("ROLLBACK");
      throw e;
    } finally {
      await this.close();
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.end();
    }
  }
}

export const productService = new Products(config);