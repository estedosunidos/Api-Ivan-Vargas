import { Router } from "express";

export class MoviesRouter{
    static get routes():Router{
        const router = Router();

        router.use('/api/movies',MoviesRouter.routes)


        return router;
        
    }
}