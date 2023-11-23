export class AssignMovieToReviewDto {
    movieId: string;
    platformId: string;
    author:string;
    body: string;
    score:number;
  
    constructor(movieId: string, platformId: string, author:string, body: string, score:number  ) {
      this.movieId = movieId;
      this.platformId = platformId;
      this.author  = author
      this.body=body
      this.score=score
    }
  
    static assigner(object: { [key: string]: any }): [string?, AssignMovieToReviewDto?] {
      const { movieId, platformId,author,body,score } = object;
  
      if (!movieId) return ['Missing movieId'];
      if (!platformId) return ['Missing platformId'];
  
      return [
        undefined,
        new AssignMovieToReviewDto(movieId, platformId,author,body,score)
      ];
    }
  }
  