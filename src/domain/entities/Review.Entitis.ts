// entities/ReviewEntity.ts
export class ReviewEntity {
  constructor(
    public id: string,
    public movieId: string,
    public platformId: string,
    public author: string,
    public body: string,
    public score: number
  ) {}
}
