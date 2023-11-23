export class DeleteMovieDto {
  movieId: string;

  constructor(movieId: string) {
    this.movieId = movieId;
  }

  static create(object: { [key: string]: any }): [string?, DeleteMovieDto?] {
    const { movieId } = object;

    if (!movieId) {
      return ['Missing movieId'];
    }

    return [undefined, new DeleteMovieDto(movieId)];
  }
}
