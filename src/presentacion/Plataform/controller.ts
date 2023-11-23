import { Request,Response} from 'express'
import { RegistePlatformDto } from '../../domain/dtos/RegistePlatform'
import { PlatformRepository } from '../../domain/repositorios/platform.repositorio'
import { CustomError } from '../../domain/error/custom.error'
export class PlatformController{
    constructor(private readonly PlatformRepository:PlatformRepository){

    }
    private handleErrror =(error: unknown,res:Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json(error.message)
        }
        //console.log(error)
        //return res.status(500).json({error:'Internal Server Error'})

    }
    registerPlatform=  async (req:Request,res:Response)=>{
        const [error,registerMoviesDto]=RegistePlatformDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.PlatformRepository.register(registerMoviesDto!)
         .then(response=>res.json(response))
         .catch(error=> res.status(500).json(error))
         .catch(error=> this.handleErrror(error,res))
     

    }
    readPltform= async (req:Request,res:Response)=>{
        res.json('ReadeMoviesController')

    }
}