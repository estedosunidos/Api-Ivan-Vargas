
import { AssignMovieToPlatformDto } from "../dtos/AssignMovieToPlatformDto";
import { CreateReviewDto } from "../dtos/CreateReviewDto ";
import { DeleteMovieDto } from "../dtos/DeleteMovieDto";
import { GetByIdMoviesDTP } from "../dtos/GetByIdMovies";
import { PaginacionMovieDto } from "../dtos/PaginacionDto";
import { RegisteMovieDto } from "../dtos/RegisterMoviesDto";
import { UpdateMovieDto } from "../dtos/UpdateMovieDto";
import { CloneMovieDto } from "../dtos/clonamoviesDto";
import { MoviesEntity } from "../entities/Movies.Entity";
import { ReviewEntity } from "../entities/Review.Entitis";

export abstract class MoviesDatasource {
    abstract register(registemoviesdto:RegisteMovieDto):Promise<MoviesEntity>
    abstract readMovies():Promise<MoviesEntity[]>
    abstract cloneMovie(cloneMovieDto:CloneMovieDto): Promise<MoviesEntity>;
    abstract UpdateMovie(updateMovieDto:UpdateMovieDto):Promise<{ success: boolean; movie: MoviesEntity }>
    abstract assignMovieToPlatform(assignMovieToPlatformDto: AssignMovieToPlatformDto): Promise<MoviesEntity>;
    abstract createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity>;
    abstract GetByIdMovie(getByIdMoviesDTP:GetByIdMoviesDTP):Promise <ReviewEntity[] >
    abstract deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void>;
    abstract PaginacionMovie(paginacionMovieDto:PaginacionMovieDto): Promise<MoviesEntity[]>;
}