import { RegistePlatformDto } from "../dtos/RegistePlatform";
import { PlatformEntity } from "../entities/Platform.Entities";


export abstract class PlatformDatasource {
    abstract register(registePlatformDto:RegistePlatformDto):Promise<PlatformEntity>

}