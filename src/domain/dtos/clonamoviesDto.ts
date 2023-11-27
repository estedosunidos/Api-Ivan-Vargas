export class CloneMovieDto {
  constructor(
    public id: string,
    public title: string,
  ) {}

  static create(params: any): [string?, CloneMovieDto?] {
    const { id,title } = params;

    // Basic validation: Check if id is a non-empty string
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return ['Invalid id parameter'];
    }

    return [undefined, new CloneMovieDto(id,title)];
  }
}
