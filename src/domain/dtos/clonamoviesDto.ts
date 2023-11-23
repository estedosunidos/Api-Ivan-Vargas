export class CloneMovieDto {
  constructor(
    public id:string, 
    public title: string,
    public director: string,
    public score: number
  ) {}

  static create(body:any ,params: any): [string?, CloneMovieDto?] {
    const { id } = params;
    const{ title, director, score } = body
 

    return [undefined, new CloneMovieDto( id, title, director, score )];
  }
}
