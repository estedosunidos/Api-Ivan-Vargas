import { v4 as uuidv4 } from 'uuid';

export class RegisteReviwnDto {
  constructor(
    public id: string,
    public movieId: string,
    public author: string,
    public body: string,
    public createdAt: Date,
    public updatedAt: Date,
    public score: number,
    public reviews: string[] 
  ) {}

  static create(object: {
    movieId: string;
    author: string;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
    score: number;
    reviews: string[];
  }): [string?, RegisteReviwnDto?] {
    const { movieId, author, body, createdAt, updatedAt, score, reviews } = object;

    if (!author) return ['Missing author'];
    if (!body) return ['Missing body'];
    if (!score) return ['Missing score'];

    const id = uuidv4();
    const currentTimestamp = Date.now();
    const createdAtDate = createdAt || new Date(currentTimestamp);
    const updatedAtDate = updatedAt || new Date(currentTimestamp);

    return [
      undefined,
      new RegisteReviwnDto(id, movieId, author, body, createdAtDate, updatedAtDate, score, reviews)
    ];
  }
}
