import { MoviesDatasource } from "../../domain/datasources/movies.datasource";
import { MoviesEntity } from "../../domain/entities/Movies.Entity";
import { CustomError } from "../../domain/error/custom.error";
import { MoviesModel } from "../../data/mongodb/model/movies";
import slugify from "slugify";
import { MoviesMapper } from "../mappers/movies.mapper";
import { UpdateMovieDto } from "../../domain/dtos/UpdateMovieDto";
import { RegisteMovieDto } from "../../domain/dtos/RegisterMoviesDto";
import { CloneMovieDto } from "../../domain/dtos/clonamoviesDto";
import { v4 as uuidv4 } from "uuid";
import { PaginacionMovieDto } from "../../domain/dtos/PaginacionDto";
import { ObjectId } from "mongodb";
import { AssignMovieToPlatformDto } from "../../domain/dtos/AssignMovieToPlatformDto";
import { Types } from "mongoose";
import { ReviewModel } from "../../data/mongodb/model/review";
import { ReviewByPlatformDto } from "../../domain/dtos/ReviewByPlatformDto ";
import { ReviewEntity } from "../../domain/entities/Review.Entitis";
import { DeleteMovieDto } from "../../domain/dtos/DeleteMovieDto";
import { CreateReviewDto } from "../../domain/dtos/CreateReviewDto ";
export class MovsiesDataSourceImpl implements MoviesDatasource {
  async createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity> {
       try {
       const { movieId, platformId, author, body, score } =
       createReviewDto;
       console.log(movieId, platformId, author, body, score);
       const movie = await MoviesModel.findById(movieId);
       console.log(movie);
       if (!movie) {
         throw new Error("Movie not found");
       }

  //     // Crea la reseña y asigna a la película
       const review = new ReviewModel({
         movie: movieId,
       platform: platformId,
       author: author,
         body: body,
         score: score,
       });

  //     // Guarda la reseña en la base de datos
       const savedReview = await review.save();

  //     // Actualiza la película con la nueva reseña
       movie.reviews.push(savedReview._id);
       const updatedMovie = await movie.save();

  //     // Mapea la respuesta a la entidad
       const moviesEntity = MoviesMapper.MoviesEntityFromObject(
         updatedMovie.toObject()
       );

       return Promise.resolve(moviesEntity);
     } catch (error) {
  //     //console.error(`Error creating review: ${error.message}`);
       throw CustomError.internalserverError("Error creating review");
     }
  }
     
  
  async deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void> {
    try {
      
      await MoviesModel.deleteOne({ _id: deleteMovieDto.movieId });
    } catch (error) {
      // Manejar errores
      //console.error(`Error deleting movie: ${error.message}`);
      throw new Error('Error deleting movie');
    }
  }
  
  GetByIdMovie(reviewByPlatformDto: ReviewByPlatformDto): Promise<ReviewEntity> {
    throw new Error("Method not implemented.");
  }

  // async GetByIdMovie(reviewByPlatformDto: ReviewByPlatformDto): Promise<ReviewEntity[]> {
  //   try {
  //     const { movieId, platformId } = reviewByPlatformDto;
  
  //     // Obtén la película por su ID
  //     console.log(movieId, platformId);
  //     const movie = await MoviesModel.findById(movieId);
  
  //     if (!movie) {
  //       throw new CustomError(404, 'Movie not found');
  //     }
  
  //     // Filtra las reseñas por plataforma
  //     const reviewsByPlatform = (movie.reviews as Review[]).filter((review) => review.platformId === platformId);

  
  //     // Devuelve las reseñas filtradas
  //     return reviewsByPlatform;
  //   } catch (error) {
  //     throw new CustomError(500, 'Internal Server Error');
  //   }
  // }
  // async createReview(
  //   assignMovieToPlatformDto: AssignMovieToPlatformDto
  // ): Promise<MoviesEntity> {
  //   try {
  //     const { movieId, platformId, author, body, score } =
  //       assignMovieToPlatformDto;
  //     console.log(movieId, platformId, author, body, score);
  //     const movie = await MoviesModel.findById(movieId);
  //     console.log(movie);
  //     if (!movie) {
  //       throw new Error("Movie not found");
  //     }

  //     // Crea la reseña y asigna a la película
  //     const review = new ReviewModel({
  //       movie: movieId,
  //       platform: platformId,
  //       author: author,
  //       body: body,
  //       score: score,
  //     });

  //     // Guarda la reseña en la base de datos
  //     const savedReview = await review.save();

  //     // Actualiza la película con la nueva reseña
  //     movie.reviews.push(savedReview._id);
  //     const updatedMovie = await movie.save();

  //     // Mapea la respuesta a la entidad
  //     const moviesEntity = MoviesMapper.MoviesEntityFromObject(
  //       updatedMovie.toObject()
  //     );

  //     return Promise.resolve(moviesEntity);
  //   } catch (error) {
  //     //console.error(`Error creating review: ${error.message}`);
  //     throw CustomError.internalserverError("Error creating review");
  //   }
  // }
  async updateMovie(
    updateMovieDto: UpdateMovieDto,
    platformId: string
  ): Promise<MoviesEntity> {
    throw new Error("Method not implemented.");
  }
  // async deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<MoviesEntity> {
  //   throw new Error("Method not implemented.");
  // }
  async assignMovieToPlatform(
    assignMovieToPlatformDto: AssignMovieToPlatformDto
  ): Promise<MoviesEntity> {
    try {
      const { movieId, platformId } = assignMovieToPlatformDto;
      console.log(movieId, platformId);
      const movie = await MoviesModel.findById(movieId);
      console.log(movie);
      if (!movie) {
        throw new Error("Movie not found");
      }
      const objectIdPlatformId1 = new Types.ObjectId(platformId);
      console.log(objectIdPlatformId1);
      if (movie.platforms.includes(objectIdPlatformId1)) {
        movie.platforms.push(objectIdPlatformId1);
      }
      const isPlatformAssigned = movie.platforms.includes(objectIdPlatformId1);
      console.log(isPlatformAssigned);
      const updatedMovie = await movie.save();
      console.log(updatedMovie);
      // Mapea la respuesta a la entidad
      const moviesEntity = MoviesMapper.MoviesEntityFromObject(
        updatedMovie.toObject()
      );

      return Promise.resolve(moviesEntity);
    } catch (error) {
      throw new Error("Error assigning movie to platform");
    }
  }

  async PaginacionMovie(paginacionMovieDto: PaginacionMovieDto): Promise<MoviesEntity[]> {
    try {
      const { page, pageSize } = paginacionMovieDto;
      const skip = (page - 1) * pageSize;
      const paginatedMovies = await MoviesModel.find()
        .skip(skip)
        .limit(pageSize)
        .exec();
  
      const paginatedMoviesEntities = paginatedMovies.map(movie => MoviesMapper.MoviesEntityFromObject(movie.toObject()));
  
      return paginatedMoviesEntities;
    } catch (error) {
      console.error("Error fetching paginated movies:", error);
      throw new Error("Error fetching paginated movies");
    }
  }
  //ESTE ENDPOINT SIRVE PARA CLONAR UNA PELICULAR  Y GENERAL UN NUEVO ID
  async cloneMovie(cloneMovieDto: CloneMovieDto): Promise<MoviesEntity> {
    const { title, director, score } = cloneMovieDto;

    // Crear una copia de la película original sin el _id
    const clonedMovieData = { title, director, score, createdAt: new Date() };
    const clonedMovie = await MoviesModel.create(clonedMovieData);
  
    return clonedMovie.toObject();
  }
  
  //ESTE ENDPOINT SIRVE PARA ACTUALIZAR LA PELICULA EN LA BASE DE DATO
  async UpdateMovie(updateemoviesdto: UpdateMovieDto): Promise<MoviesEntity>{
    const { _id, title, director, score } = updateemoviesdto;
    console.log(_id, title, director, score);
  
    try {
      // 1. Encuentra la película por ID
      const movie = await MoviesModel.findById(_id);
      console.log(movie);
  
      if (!movie) {
        throw new Error("Película no encontrada");
      }
  
      // 2. Genera el slug
      const slug = slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });
  
      // 3. Actualiza las propiedades de la película
      movie.title = title;
      movie.slug = slug;
      movie.director = director;
      movie.score = score;
     // movie.updatedAt = Date.now();
  
      // 4. Guarda la película actualizada
      const updatedMovie = await movie.save();
  
      // 5. Mapea la respuesta a nuestra entidad
      const movieEntity = MoviesMapper.MoviesEntityFromObject(updatedMovie.toObject());
  
      // 6. Devuelve la entidad
      return movieEntity;
    } catch (error) {
      console.error("Error al actualizar la película:", error);
  
      if (error instanceof CustomError) {
        throw error;
      }
  
      throw new Error("Error al actualizar la película");
    }
  };

  
  //ESTE ENDPOINT SIRVE PARA CREAR UNA PELICULA Y ALMACENARLA EN LA BASE DE DATO
  async register(registemoviesdto: RegisteMovieDto): Promise<MoviesEntity> {
    const { title, director, score } = registemoviesdto;

    try {
      // 1. Verifica si la película existe
      const exist = await MoviesModel.findOne({ title: title });
      if (exist) {
        //throw new CustomError.BadRequest(
        ///"El título de la película ya existe en la base de datos"
        //);
      }

      // 2. Genera el slug
      const slug = slugify(title, {
        lower: true, // Convertir a minúsculas
        remove: /[*+~.()'"!:@]/g, // Eliminar caracteres especiales
      });

      // 3. Crea la película
      const movie = await MoviesModel.create({
        title: title,
        slug: slug,
        director: director,
        score: score,
        createdAt: Date.now(), // Aquí deberías llamar a la función Date.now() para obtener la fecha actual
      });

      // 4. Mapea la respuesta a nuestra entidad
      const movieEntity = MoviesMapper.MoviesEntityFromObject(movie);

      // 5. Devuelve la entidad
      return movieEntity;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalserverError;
    }
  }
  //ESTE ENDPOINT SIRVE PARA TRAER INFORMACION DE LA BASE DE DATO
  async readMovies(): Promise<MoviesEntity[]> {
    try {
      console.log("ffggghgg");
      // Lógica para leer películas utilizando el moviesRepository
      const movies = await MoviesModel.find();

      // Puedes realizar más procesamiento aquí si es necesario

      return movies.map((movie) => MoviesMapper.MoviesEntityFromObject(movie));
    } catch (error) {
      console.error(error);
      // Puedes lanzar un error aquí si lo deseas o manejarlo de otra manera
      throw new CustomError(500, "Error al leer películas");
    }
  }
}
