export class UpdateMovieDto {
  _id: string;
  title: string;
  director: string;
  score: number;

  constructor(_id: string, title: string, director: string, score: number) {
    this._id = _id;
    this.title = title;
    this.director = director;
    this.score = score;
  }

  static update(object: { [key: string]: any }): [string?, UpdateMovieDto?] {
    const { _id, title, director, score } = object;
  console.log( _id, title, director, score)
    if (!title) return ['Missing title'];
    if (!director) return ['Missing director'];
    if (!score) return ['Missing score'];

    return [
      undefined,
      new UpdateMovieDto(_id, title, director, score)
    ];
  }
}
