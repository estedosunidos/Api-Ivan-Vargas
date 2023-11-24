import mongoose from "mongoose";
import { envs } from "../../config/envs";

interface Options{
    mongoUrl?:string
    dbName?:string
}

export class MongoDatabase{
    static async connect(options: Options){
        const {mongoUrl= '',dbName} = options
        try {
          if (!mongoUrl) {
            throw new Error('La URL de MongoDB es obligatoria.');
          }
          mongoose.set('strictQuery', false);
          const mongoUrl1 = mongoUrl;
          const dbName1 = dbName;
          const options: mongoose.ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: dbName1,
          };
    
          mongoose.connect(mongoUrl1, options);
            console.log('Conectado correctamente a la base de datos');
          } catch (err) {
            console.error(err);
            throw new Error('No se ha establecido la conexión a la base de datos');
          }
    }
}