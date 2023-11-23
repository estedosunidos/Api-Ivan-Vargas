import mongoose from "mongoose";

interface Options{
    mongoUrl:string
    dbName:string
}

export class MongoDatabase{
    static async connect(options: Options){
        const {mongoUrl,dbName} = options
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/pruebatecnicaGGTech', {
    
            });
            console.log('Conectado correctamente a la base de datos');
          } catch (err) {
            console.error(err);
            throw new Error('No se ha establecido la conexión a la base de datos');
          }
    }
}