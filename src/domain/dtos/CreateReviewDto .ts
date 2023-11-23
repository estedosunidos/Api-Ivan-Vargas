export class CreateReviewDto {
    movieId: string;
    platformId: string;
    author: string;
    body: string;
    score: number;
  
    constructor(movieId: string, platformId: string, author: string, body: string, score: number) {
      this.movieId = movieId;
      this.platformId = platformId;
      this.author = author;
      this.body = body;
      this.score = score;
    }
  
    static create(object: { [key: string]: any }): [string?, CreateReviewDto?] {
      const { movieId, platformId, author, body, score } = object;
  
      if (!movieId) return ['Missing movieId'];
      if (!platformId) return ['Missing platformId'];
      if (!author) return ['Missing author'];
      if (!body) return ['Missing body'];
      if (!score) return ['Missing score'];
  
      return [
        undefined,
        new CreateReviewDto(movieId, platformId, author, body, score)
      ];
    }
  }
  