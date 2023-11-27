
import { Types } from 'mongoose'; 
import { PlatformEntity } from '../../domain/entities/Platform.Entities';
import { CustomError } from '../../domain/error/custom.error';

interface PlatformObject {
  _id: string | Types.ObjectId; 
  id: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PlatformMapper {
  static platformEntityFromObject(object: PlatformObject): PlatformEntity {
    const { title, createdAt, updatedAt } = object;

   
    if (!title) {
      throw CustomError.NotFound('Missing Title');
    }


    return new PlatformEntity(
      title,
      createdAt,
      updatedAt
    );
  }
}
