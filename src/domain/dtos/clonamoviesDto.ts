export class CloneAndGenerateIdDto {
  constructor(
    public originalMovieId: string,
    public newTitle: string,
    public generateNewId: boolean = true
  ) {}

  // Iterator method for the class
  [Symbol.iterator](): Iterator<string | boolean> {
    // Assuming your iterator returns strings and a boolean, replace with the actual types
    const values = [this.originalMovieId, this.newTitle, this.generateNewId];
    let index = 0;

    return {
      next: () => ({
        value: values[index++],
        done: index > values.length
      })
    };
  }

  static create(params: any): CloneAndGenerateIdDto | { error: string } {
    const { originalMovieId, newTitle, generateNewId } = params;

    // Basic validation: Check if originalMovieId and newTitle are non-empty strings
    if (!originalMovieId || typeof originalMovieId !== 'string' || originalMovieId.trim() === '') {
      return { error: 'Invalid originalMovieId parameter' };
    }

    if (!newTitle || typeof newTitle !== 'string' || newTitle.trim() === '') {
      return { error: 'Invalid newTitle parameter' };
    }

    return new CloneAndGenerateIdDto(originalMovieId, newTitle, generateNewId);
  }
}
