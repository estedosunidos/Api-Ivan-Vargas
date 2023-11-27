export class CloneMovieDto {
  constructor(
    public id: string,
    public title: string
  ) {}

  static create(params: any): CloneMovieDto | string {
    const { id, title } = params;

    // Basic validation: Check if id and title are non-empty strings
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return 'Invalid id parameter';
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return 'Invalid title parameter';
    }

    return new CloneMovieDto(id, title);
  }
}
