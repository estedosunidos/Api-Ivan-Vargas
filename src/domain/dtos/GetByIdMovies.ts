export class GetByIdMovies {
    movieId: string;
    platformId:string;
  
  
    constructor(movieId: string,platformId:string)  {
      this.movieId = movieId;
      this.platformId=platformId
    }
  
    static assigner(object: { [key: string]: any }): [string?, GetByIdMovies?] {
      const { movieId,platformId } = object;
  
      if (!movieId) return ['Missing movieId'];
  
      return [
        undefined,
        new GetByIdMovies(movieId,platformId)
      ];
    }
  }