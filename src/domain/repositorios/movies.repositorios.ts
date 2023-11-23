
import { MoviesEntity } from "../entities/Movies.Entity";
import { DeleteMovieDto } from '../dtos/DeleteMovieDto';
import { UpdateMovieDto } from '../dtos/UpdateMovieDto';
import { RegisteMovieDto } from '../dtos/RegisterMoviesDto';
import { CloneMovieDto } from "../dtos/clonamoviesDto";
import { PaginacionMovieDto } from "../dtos/PaginacionDto";
import { ReviewEntity } from "../entities/Review.Entitis";
import { AssignMovieToPlatformDto } from "../dtos/AssignMovieToPlatformDto";
import { CreateReviewDto } from "../dtos/CreateReviewDto ";
import { ReviewByPlatformDto, ReviewDto } from "../dtos/ReviewByPlatformDto ";
//Aqui todas la regla de negocio
export abstract class MoviesRepository {
    abstract register(registemoviesdto:RegisteMovieDto):Promise<MoviesEntity>
    abstract readMovies(): Promise<MoviesEntity[]>;
    abstract UpdateMovie(updateMovieDto:UpdateMovieDto):Promise<MoviesEntity>
    abstract  findById(movieId: string): Promise<MoviesEntity | null>;
    abstract save(movie: MoviesEntity): Promise<MoviesEntity>;
    abstract cloneMovie(cloneMovieDto:CloneMovieDto): Promise<MoviesEntity>;
    abstract PaginacionMovie(paginacionMovieDto:PaginacionMovieDto): Promise<MoviesEntity[]>;
    abstract assignMovieToPlatform(assignMovieToPlatformDto: AssignMovieToPlatformDto): Promise<MoviesEntity>;
    abstract createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity>;
    abstract GetByIdMovie(reviewByPlatformDto:ReviewByPlatformDto):Promise<ReviewDto>
    abstract deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void>;
}