export class CloneMovieDto {
  constructor(
    public id:string, 

  ) {}

  static create(params: any): [string?, CloneMovieDto?] {
    const { id } = params;

 

    return [undefined, new CloneMovieDto( id)];
  }
}
