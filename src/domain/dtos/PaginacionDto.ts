// clone-movie.dto.ts

export class PaginacionMovieDto {
    constructor(
       public  page: number,
        public pageSize: number
    ) {}
    static create( object: { [ key: string ]: any; } ): [ string?, PaginacionMovieDto?] {
  
      const { page,pageSize} = object;
  
  
      return [
        undefined,
        new PaginacionMovieDto(page,pageSize)
      ];
    }
    }