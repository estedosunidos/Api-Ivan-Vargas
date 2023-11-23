export class AssignMovieToPlatformDto {
    movieId: string;
    platformId: string;
  
  
    constructor(movieId: string, platformId: string  ) {
      this.movieId = movieId;
      this.platformId = platformId;
    }
  
    static assigner(object: { [key: string]: any }): [string?, AssignMovieToPlatformDto?] {
      const { movieId, platformId } = object;
  
      if (!movieId) return ['Missing movieId'];
      if (!platformId) return ['Missing platformId'];
  
      return [
        undefined,
        new AssignMovieToPlatformDto(movieId, platformId)
      ];
    }
  }
  