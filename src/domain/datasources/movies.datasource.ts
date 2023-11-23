
import { AssignMovieToPlatformDto } from "../dtos/AssignMovieToPlatformDto";
import { CreateReviewDto } from "../dtos/CreateReviewDto ";
import { DeleteMovieDto } from "../dtos/DeleteMovieDto";
import { PaginacionMovieDto } from "../dtos/PaginacionDto";
import { RegisteMovieDto } from "../dtos/RegisterMoviesDto";
import { ReviewByPlatformDto, ReviewDto } from "../dtos/ReviewByPlatformDto ";
import { UpdateMovieDto } from "../dtos/UpdateMovieDto";
import { CloneMovieDto } from "../dtos/clonamoviesDto";
import { MoviesEntity } from "../entities/Movies.Entity";
import { ReviewEntity } from "../entities/Review.Entitis";

export abstract class MoviesDatasource {
    abstract register(registemoviesdto:RegisteMovieDto):Promise<MoviesEntity>
    abstract readMovies():Promise<MoviesEntity[]>
    abstract cloneMovie(cloneMovieDto:CloneMovieDto): Promise<MoviesEntity>;
    abstract UpdateMovie(updateMovieDto:UpdateMovieDto):Promise<MoviesEntity>
    abstract updateMovie(updateMovieDto: UpdateMovieDto, platformId: string): Promise<MoviesEntity>;
    abstract assignMovieToPlatform(assignMovieToPlatformDto: AssignMovieToPlatformDto): Promise<MoviesEntity>;
    abstract createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity>;
    abstract GetByIdMovie(reviewByPlatformDto:ReviewByPlatformDto):Promise <ReviewEntity>
    abstract deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void>;
    abstract PaginacionMovie(paginacionMovieDto:PaginacionMovieDto): Promise<MoviesEntity[]>;
}