
import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongodb/mongo-database";
import { AppRouets } from "./presentacion/routes";
import { Server } from "./presentacion/server";
(()=>{
    main();

})()
async function main (){
    //todo: await base de dato

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_DB_URL
    })

    //todo: awaiy de nuestro servidor

    new Server({
        port:envs.PORT,
        routes:AppRouets.routes

    }
    ).start()
}





































































































































