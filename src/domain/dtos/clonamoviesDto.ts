export class CloneMovieDto {
  constructor(
    public title: string,
    public director: string,
    public score: number
  ) {}

  static fromObject(obj: any): CloneMovieDto {
    const { title, director, score } = obj;
    return new CloneMovieDto(title, director, score);
  }
}