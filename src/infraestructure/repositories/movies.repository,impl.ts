import { MoviesModel } from "../../data/mongodb/model/movies";
import { MoviesDatasource } from "../../domain/datasources/movies.datasource";
import { AssignMovieToPlatformDto } from "../../domain/dtos/AssignMovieToPlatformDto";
import { CreateReviewDto } from "../../domain/dtos/CreateReviewDto ";
import { DeleteMovieDto } from "../../domain/dtos/DeleteMovieDto";
import { GetByIdMoviesDTP } from "../../domain/dtos/GetByIdMovies";
import { PaginacionMovieDto } from "../../domain/dtos/PaginacionDto";
import { RegisteMovieDto } from "../../domain/dtos/RegisterMoviesDto";
import { UpdateMovieDto } from "../../domain/dtos/UpdateMovieDto";
import { CloneMovieDto } from "../../domain/dtos/clonamoviesDto";
import { MoviesEntity } from "../../domain/entities/Movies.Entity";
import { ReviewEntity } from "../../domain/entities/Review.Entitis";
import { MoviesRepository } from "../../domain/repositorios/movies.repositorios";


export class MooviesRepositoryImple implements MoviesRepository {
  constructor(private readonly moviesdatasource: MoviesDatasource) {}
  createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity> {
    return this.moviesdatasource.createReview(createReviewDto);
  }
  deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void> {
    return this.moviesdatasource.deleteMovie(deleteMovieDto);
  }
  GetByIdMovie(getByIdMoviesDTP: GetByIdMoviesDTP): Promise<ReviewEntity[] > {
    return this.moviesdatasource.GetByIdMovie(getByIdMoviesDTP);
  }
  assignMovieToPlatform(assignMovieToPlatformDto: AssignMovieToPlatformDto): Promise<MoviesEntity> {
    return this.moviesdatasource .assignMovieToPlatform(assignMovieToPlatformDto);
  }
  
  PaginacionMovie(paginacionMovieDto: PaginacionMovieDto): Promise<MoviesEntity[]> {
    return this.moviesdatasource.PaginacionMovie(paginacionMovieDto);
  }

  cloneMovie(cloneMovieDto: CloneMovieDto): Promise<MoviesEntity> {
    return this.moviesdatasource.cloneMovie(cloneMovieDto);
  }

  async findById(movieId: string): Promise<MoviesEntity | null> {
    return MoviesModel.findById(movieId).lean();
  }

  async save(movie: MoviesEntity): Promise<MoviesEntity> {
    const movieModel = new MoviesModel(movie);
    const savedMovie = await movieModel.save();
    return savedMovie.toObject();
  }
 
  UpdateMovie(updatemoviesdto: UpdateMovieDto): Promise<{ success: boolean; movie: MoviesEntity }> {
    return this.moviesdatasource.UpdateMovie(updatemoviesdto);
  }
  readMovies(): Promise<MoviesEntity[]> {
    return this.moviesdatasource.readMovies();
  }
  register(registemoviesdto: RegisteMovieDto): Promise<MoviesEntity> {
    return this.moviesdatasource.register(registemoviesdto);
  }
  

}
