import { MovsiesDataSourceImpl } from "./../infraestructure/dataSoucer/movie.datasource.impl";
import { Router } from "express";
import { MoviesController } from "./movies/controller";
import { PlatformController } from "./Plataform/controller";
import { MooviesRepositoryImple } from "../infraestructure/repositories/movies.repository,impl";
import { PlatformRepositoryImple } from "../infraestructure/repositories/platform.repository.impl";
import { PlatformDatasourceImpl } from "../infraestructure/dataSoucer/platform.datasoruce.impl";

export class AppRouets {
  static get routes(): Router {
    const router = Router();
    const database = new MovsiesDataSourceImpl();
    const moviesRepository = new MooviesRepositoryImple(database);
    const controller = new MoviesController(moviesRepository);

    const database3 = new PlatformDatasourceImpl();
    const PlatformRepository = new PlatformRepositoryImple(database3);
    const controller3 = new PlatformController(PlatformRepository);

    //Ruta del crud de peliculas

    router.get("/readyMovies", controller.readMovies);
    router.get("/paginacionMovies/:page?/:pageSize?", controller.Paginacionpelicula);
    router.get("/moviebyid/:movieId", controller.moviebyid);
    router.post("/createMovies", controller.registerMovies);
    router.post("/ClonaPelicula/:id", controller.Clonapelicula);
    router.put("/UpdateMovies/:id", controller.UpdadeMovies);
    router.post("/assignertomovietoplatform",controller.Assignartoplatformtomovies)
    router.delete("/deleteMovies/:id", controller.deleteMovies)
    router.post("/Assignartoreviewtomovies", controller.Assignartoreviewtomovies);
    //ruta de platafaoma (Netflix,Disney pls, HBO MAX,Hulu,Apple tv and Amazon prime)
    router.get("/readyPlatform", controller3.readPltform);
    router.post("/createPlatform", controller3.registerPlatform);
    return router;
  }
}
