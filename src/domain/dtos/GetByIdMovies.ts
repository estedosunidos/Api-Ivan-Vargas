export class GetByIdMoviesDTP{
    movieId: string;
    
  
  
    constructor(movieId: string)  {
      this.movieId = movieId;
    }
  
    static assigner(object: { [key: string]: any }): [string?, GetByIdMoviesDTP?] {
      const { movieId,platformId } = object;
    console.log(movieId,platformId)
      
  
      return [
        undefined,
        new GetByIdMoviesDTP(movieId)
      ];
    }
  }