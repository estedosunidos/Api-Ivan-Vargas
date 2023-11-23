import { Router } from "express";

export class PlatformRouter{
    static get routes():Router{
        const router = Router();

        router.use('/api/platform',PlatformRouter.routes)


        return router;
        
    }
}