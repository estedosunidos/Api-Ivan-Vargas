export class CloneMovieDto {
    constructor(public originalMovieId: string, public newTitle: string) {}
  
    // Optional: Add validation or other methods as needed
  
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
  
