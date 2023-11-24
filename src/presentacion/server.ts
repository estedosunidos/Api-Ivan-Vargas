import express, { Router,Request, Response, NextFunction  } from "express";
import cors from "cors";
interface Opitions {
  port: number;
  routes: Router;
}
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  constructor(option: Opitions) {
    const { port = 3100, routes } = option;
    this.port = port;
    this.routes = routes;
  }
  async start() {
    console.log('Hola Mundo')
    // Restricción de IP
    const allowedIPs = ["100.20.92.101", "44.225.181.72","44.227.217.144"];
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const clientIP: string = req.ip!;
      if (allowedIPs.includes(clientIP)) {
        next();
      } else {
        res.status(403).send("Acceso no autorizado");
      }
    });
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    });
  }
}
