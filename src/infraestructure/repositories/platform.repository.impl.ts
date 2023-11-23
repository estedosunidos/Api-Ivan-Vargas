import { PlatformDatasource } from "../../domain/datasources/platform.datasource";
import { RegistePlatformDto } from "../../domain/dtos/RegistePlatform";
import { PlatformEntity } from "../../domain/entities/Platform.Entities";
import { PlatformRepository } from "../../domain/repositorios/platform.repositorio";

export class PlatformRepositoryImple implements PlatformRepository {
  constructor(private readonly PlatformDatasource: PlatformDatasource) {}
    register(registePlatformDto: RegistePlatformDto): Promise<PlatformEntity> {
        return this.PlatformDatasource.register(registePlatformDto);
        }
    }
 
 

