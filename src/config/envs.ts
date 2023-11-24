import 'dotenv/config';
import { get } from 'env-var';



export const envs = {


  PORT: get('PORT').required().asPortNumber(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').asString(),
  MONGO_DB_URL:get('MONGO_DB_URL').asString(),


}