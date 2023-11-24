import mongoose from "mongoose";
import { envs } from "../../config/envs";

interface Options{
    mongoUrl:string
    dbName:string
}

export class MongoDatabase{
    static async connect(options: Options){
        const {mongoUrl,dbName} = options
        try {
            await mongoose.connect(envs.MONGO_DB_URL, {
    
            });
            console.log('Conectado correctamente a la base de datos');
          } catch (err) {
            console.error(err);
            throw new Error('No se ha establecido la conexión a la base de datos');
          }
    }
}