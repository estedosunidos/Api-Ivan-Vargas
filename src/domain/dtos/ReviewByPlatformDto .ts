import { ReviewEntity } from "../entities/Review.Entitis";

export class ReviewByPlatformDto {

  movieId: string;
  platformId: string;
  reviews: ReviewEntity[];

  constructor(movieId: string, platformId: string,reviews: ReviewEntity[]) {
    this.movieId = movieId;
    this.platformId = platformId;
    this.reviews=reviews;
  }


  
    static create(object: { [key: string]: any }): [string?, ReviewByPlatformDto?] {
      const { movieId, platformId ,reviews} = object;
  
      if (!movieId) return ['Missing movieId'];
  
      return [
        undefined,
        new ReviewByPlatformDto(movieId, platformId ,reviews)
      ];
    }
  }
  
  // review.dto.ts
  export class ReviewDto {
    platformId: string;
    author: string;
    body: string;
    score: number;
  
    constructor(platformId: string, author: string, body: string, score: number) {
      this.platformId = platformId;
      this.author = author;
      this.body = body;
      this.score = score;
    }
  
    static create(object: { [key: string]: any }): [string?, ReviewDto?] {
      const { platformId, author, body, score } = object;
  
      if (!platformId) return ['Missing platformId'];
      if (!author) return ['Missing author'];
      if (!body) return ['Missing body'];
      if (!score) return ['Missing score'];
  
      return [
        undefined,
        new ReviewDto(platformId, author, body, score)
      ];
    }
  }