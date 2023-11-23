import { MoviesEntity } from "../../domain/entities/Movies.Entity";
import { PlatformEntity } from "../../domain/entities/Platform.Entities";
import { ReviewEntity } from "../../domain/entities/Review.Entitis";
import { CustomError } from "../../domain/error/custom.error";


export class MoviesMapper {
    static MoviesEntityFromObject(object: { [key: string]: any }) {
        const { _id, id, title, slug, director, createdAt, updatedAt, score, reviews, platforms } = object;
        if (!_id || !id) {
            throw CustomError.badRequest('Missing Id');
        }
        if (!title) throw CustomError.NotFound('Missing Title');
        if (!director) throw CustomError.NotFound('Missing director');
        if (!score) throw CustomError.NotFound('Missing score');

        // Mapea los objetos de reviews y platforms a instancias de ReviewEntity
        const mappedReviews: ReviewEntity[] = reviews.map((review: any) => new ReviewEntity(review.id,review.movieId, review.platformId, review.author, review.body, review.score));
        // Mapea los objetos de platforms a instancias de PlatformEntity
        const mappedPlatforms: PlatformEntity[] = platforms.map((platform: any) => new PlatformEntity(platform.title, platform.createdAt, platform.updatedAt));


    
        return new MoviesEntity(
            _id || id,
            title,
            slug,
            director,
            score,
            mappedReviews,
            mappedPlatforms,
            createdAt,
            updatedAt
        );
    }
}
