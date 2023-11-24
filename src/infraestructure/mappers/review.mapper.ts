import { Schema } from 'mongoose';
import { ReviewEntity } from '../../domain/entities/Review.Entitis';
import { CustomError } from '../../domain/error/custom.error';

export class ReviewMapper {
    static toDTO(review: ReviewEntity) {
      return {
        id:review.id,
        movieId: review.movieId,
        platformId: review.platformId,
        author: review.author,
        body: review.body,
        score: review.score,
        createdAt:review.createdAt,
        updatedAt:review.updatedAt
      };
    }
  
    static fromDTO(dto: any) {
      const review = new ReviewEntity(
        dto.id,
        dto.movieId,
        dto.platformId,
        dto.author,
        dto.body,
        dto.score,
        dto.createdAt,
        dto.updatedAt
      );
  
    
  
      return review;
    }
  }
