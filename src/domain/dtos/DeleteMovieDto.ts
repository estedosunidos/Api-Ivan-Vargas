export class DeleteMovieDto {
  constructor(public id: string) {}
  static create(object: { [key: string]: any }): [string?, DeleteMovieDto?] {
    const { id } = object;

    return [undefined, new DeleteMovieDto(id)];
  }
}
