import express, { Router,Request, Response, NextFunction  } from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
;
interface Opitions {
  port: number;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  constructor(option: Opitions) {
    const { port = 8000, routes } = option;
    this.port = port;
    this.routes = routes;
  }
  async start() {
    console.log('Hola Mundo')
  
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);
    const swaggerDocument = require('../../.swagger.json'); 
    this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    });
  }
}
