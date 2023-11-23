export class RegistePlatformDto {
    constructor(
      public title: string,
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  
    static create(object: { [key: string]: any }): [string?, RegistePlatformDto?] {
      const {  title, createdAt, updatedAt } = object;
  
      return [undefined, new RegistePlatformDto( title, createdAt, updatedAt)];
    }
  }
  