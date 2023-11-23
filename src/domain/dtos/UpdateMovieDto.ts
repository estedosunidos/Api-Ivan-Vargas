export class UpdateMovieDto  {
  movieId: string;
  title: string;
  director: string;
  score: number;
  updatedAt: Date;
  constructor(movieId: string, title: string, director: string, score: number, updatedAt: Date) {
    this.movieId = movieId;
    this.title = title;
    this.director = director;
    this.score = score;
    this.updatedAt= updatedAt;
  }
 

  static create(object: { [key: string]: any }): [string?, UpdateMovieDto?] {
    const { movieId, title, director, score,updatedAt } = object;

    if (!movieId) {
      return ['Missing movieId'];
    }

    if (!title) {
      return ['Missing title'];
    }

    if (!director) {
      return ['Missing director'];
    }

    if (!score) {
      return ['Missing score'];
    }

    return [undefined, new UpdateMovieDto(movieId, title, director, score ,updatedAt)];
  }
}
