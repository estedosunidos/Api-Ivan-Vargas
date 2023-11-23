import { PlatformEntity } from './../entities/Platform.Entities';
import { MoviesEntity } from "../entities/Movies.Entity";
import { RegisteMovieDto } from '../dtos/RegisterMoviesDto';
import { RegistePlatformDto } from '../dtos/RegistePlatform';
//Aqui todas la regla de negocio
export abstract class PlatformRepository {
    abstract register(registePlatformDto:RegistePlatformDto):Promise<PlatformEntity>
}