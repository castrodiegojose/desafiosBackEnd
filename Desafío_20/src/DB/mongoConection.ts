import { MongoClient } from "../../deps.ts";
import logger from "../middlewares/logger.ts";

const MONGO_URI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient();

try {
  await client.connect(MONGO_URI);
  logger.debug(`Base de datos conectada ${MONGO_URI}`);
} catch (error) {
  logger.error(error);
}

const dbMongo = client.database("desafio_deno");

export default dbMongo;