export class CloneMovieDto {
  constructor(
    public originalMovieId: string,
    public newTitle: string
  ) {}

  // Iterator method for the class
  [Symbol.iterator](): Iterator<string> {
    // Assuming your iterator returns strings, replace with the actual type
    const values = [this.originalMovieId, this.newTitle];
    let index = 0;

    return {
      next: () => ({
        value: values[index++],
        done: index > values.length
      })
    };
  }

  static create(params: any): CloneMovieDto | { error: string } {
    const { originalMovieId, newTitle } = params;

    // Basic validation: Check if originalMovieId and newTitle are non-empty strings
    if (!originalMovieId || typeof originalMovieId !== 'string' || originalMovieId.trim() === '') {
      return { error: 'Invalid originalMovieId parameter' };
    }

    if (!newTitle || typeof newTitle !== 'string' || newTitle.trim() === '') {
      return { error: 'Invalid newTitle parameter' };
    }

    return new CloneMovieDto(originalMovieId, newTitle);
  }
}
