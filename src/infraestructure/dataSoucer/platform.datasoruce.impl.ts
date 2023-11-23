import { PlatformwModel } from "../../data/mongodb/model/platform";
import { PlatformDatasource } from "../../domain/datasources/platform.datasource";
import { RegistePlatformDto } from "../../domain/dtos/RegistePlatform";
import { PlatformEntity } from "../../domain/entities/Platform.Entities";
import { CustomError } from "../../domain/error/custom.error";
import { PlatformMapper } from "../mappers/platform.mapper";
import * as fs from "fs";
import * as path from "path";
export class PlatformDatasourceImpl implements PlatformDatasource {
  //ESTE ENDPOINT SIRVE PARA CREAR LAS PLATAFORMA STREAMING EN LA BASE DEDATO
  async register(
    registePlatformDto: RegistePlatformDto
  ): Promise<PlatformEntity> {
    try {
      const { title } = registePlatformDto;

      console.log(title)
      // Guardar la plataforma en la base de datos con la ruta de la imagen
      const platformDocument = await PlatformwModel.create({
        title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        // Otros campos si es necesario
      });

      // Mapear la respuesta a la entidad
      const platformEntity = PlatformMapper.platformEntityFromObject(
        platformDocument.toObject()
      );

      // Devolver la entidad envuelta en una promesa
      return Promise.resolve(platformEntity);
    } catch (error) {
      // Manejar errores
      console.error("Error during platform registration:", error);
      throw CustomError.internalserverError("Error interno del servidor");
    }
  }
}
