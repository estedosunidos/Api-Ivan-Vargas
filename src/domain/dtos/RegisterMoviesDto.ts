import { ReviewEntity } from "../entities/Review.Entitis";


export class RegisteMovieDto {
  constructor(
    public title: string,
    public slug: string,
    public director: string,
    public createdAt: Date,
    public score: number,
    public reviews: ReviewEntity[] = [] 
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisteMovieDto?] {
    const { title, slug, director, createdAt, score, reviews } = object;

    if (!title) return ['Missing title'];
    if (!director) return ['Missing director'];
    if (!score) return ['Missing score'];

    return [
      undefined,
      new RegisteMovieDto(title, slug, director, createdAt, score, reviews)
    ];
  }
}