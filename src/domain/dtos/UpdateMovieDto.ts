import { ReviewEntity } from "../entities/Review.Entitis";

export class UpdateMovieDto  {

  constructor(
    public movieId: string,
    public title: string,
    public slug: string,
    public director: string,
    public UpdatedAt: Date,
    public score: number,
    public reviews: ReviewEntity[] = [] 
  ) {}

 

  static create(object: { [key: string]: any }): [string?, UpdateMovieDto?] {
    const {movieId, title, slug, director, UpdatedAt, score, reviews  } = object;


    if (!title) {
      return ['Missing title'];
    }

    if (!director) {
      return ['Missing director'];
    }

    if (!score) {
      return ['Missing score'];
    }

    return [undefined, new UpdateMovieDto( movieId,title, slug, director, UpdatedAt, score, reviews )];
  }
}
