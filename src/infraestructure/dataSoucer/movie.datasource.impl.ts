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
import { ReviewEntity } from "../../domain/entities/Review.Entitis";
import { DeleteMovieDto } from "../../domain/dtos/DeleteMovieDto";
import { CreateReviewDto } from "../../domain/dtos/CreateReviewDto ";
import { GetByIdMoviesDTP } from "../../domain/dtos/GetByIdMovies";
export class MovsiesDataSourceImpl implements MoviesDatasource {
   //ESTE ENDPOINT SIRVE para mostra una pelicula por si id la siguente infoormacion todos sus datos yla reseña separada por plataforma
  async GetByIdMovie(
    getByIdMoviesDTP: GetByIdMoviesDTP
  ): Promise<ReviewEntity[]> {
    try {
      const { movieId } = getByIdMoviesDTP;
      console.log(movieId);
      // Obtén la película por su ID
      const movie = await MoviesModel.findById(movieId);

      if (!movie) {
        throw new CustomError(404, "Movie not found");
      }

      // Filtra las reseñas por plataforma
      const reviewsByPlatform = await ReviewModel.find({
        movie: movieId,
      }).exec();
      console.log(reviewsByPlatform);
      if (reviewsByPlatform.length === 0) {
        throw new CustomError(
          404,
          "No reviews found for the specified platform"
        );
      }

      const reviewsEntities: ReviewEntity[] = reviewsByPlatform.map(
        (review) => ({
          id: review.id,
          movieId: String(review.movie),
          platformId: String(review.platform),
          author: review.author,
          body: review.body,
          score: review.score,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        })
      );
      // Devuelve la reseña transformada a ReviewEntity
      return reviewsEntities;
    } catch (error) {
      console.error("Error getting reviews by movie:", error);
      throw new CustomError(500, "Internal Server Error");
    }
  }
    //ESTE ENDPOINT SIRVE PARA crear una reseña y assignarla ala pelicula segun el id y ala plataforma segun  el id 
  async createReview(createReviewDto: CreateReviewDto): Promise<MoviesEntity> {
    try {
      const { movieId, platformId, author, body, score } = createReviewDto;
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
  //ESTE ENDPOINT SIRVE PARA eliminar una peliucla dependiento del id
  async deleteMovie(deleteMovieDto: DeleteMovieDto): Promise<void> {
    try {
      await MoviesModel.deleteOne({ _id: deleteMovieDto.id });
    } catch (error) {

      throw new Error("Error deleting movie");
    }
  }
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
      if (!movie.platforms.includes(objectIdPlatformId1)) {
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
    //ESTE ENDPOINT SIRVE PARA  paginar las peliculas
  async PaginacionMovie(
    paginacionMovieDto: PaginacionMovieDto
  ): Promise<MoviesEntity[]> {
    try {
      const { page, pageSize } = paginacionMovieDto;
      console.log(page, pageSize);
      const skip = (page - 1) * pageSize;
      const paginatedMovies = await MoviesModel.find()
        .skip(skip)
        .limit(pageSize)
        .exec();
      console.log(paginatedMovies);
      const paginatedMoviesEntities = paginatedMovies.map((movie) =>
        MoviesMapper.MoviesEntityFromObject(movie.toObject())
      );

      return paginatedMoviesEntities;
    } catch (error) {
      console.error("Error fetching paginated movies:", error);
      throw new Error("Error fetching paginated movies");
    }
  }
  //ESTE ENDPOINT SIRVE PARA CLONAR UNA PELICULAR  Y GENERAL UN NUEVO ID
  async cloneMovie(cloneMovieDto: CloneMovieDto): Promise<MoviesEntity> {
    try {
      const { id,title } = cloneMovieDto;
      console.log(id);
  
      // 1. Encontrar la película original por su ID
      const originalMovie = await MoviesModel.findById(id);
      console.log(originalMovie);
  
      // 2. Lanzar un error si la película original no se encuentra
      if (!originalMovie) {
        throw new Error("Original movie not found");
      }
      // 2. Genera el slug
      let suffix = 1;
      let uniqueSlug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });

      console.log("Unique Slug:", uniqueSlug);

      while (await MoviesModel.findOne({ slug: uniqueSlug })) {
        uniqueSlug = slugify(title + "-" + suffix, { lower: true, remove: /[*+~.()'"!:@]/g });
        suffix++;
      }
      
  
      // 3. Crear un nuevo ID para la película clonada
      const newMovieId = new ObjectId();
      console.log(newMovieId);
  
      // 4. Crear los datos para la película clonada
      const clonedMovieData = {
        _id: newMovieId,
        title: originalMovie.title,
        director: originalMovie.director,
        slug: uniqueSlug,
        score: originalMovie.score,
        createdAt: new Date(),
      };
  
      // 5. Crear la película clonada
      const clonedMovie = await MoviesModel.create(clonedMovieData);
  
      // 6. Mapear la respuesta a una entidad antes de devolverla
      const clonedMovieEntity = MoviesMapper.MoviesEntityFromObject(clonedMovie.toObject());
  
      // 7. Devolver la entidad clonada
      return clonedMovieEntity;
    } catch (error) {
      console.error("Error cloning movie:", error);
  
      // 8. Lanzar un error genérico en caso de fallo
      throw new Error("Error cloning movie");
    }
  }
  
  //ESTE ENDPOINT SIRVE PARA ACTUALIZAR LA PELICULA EN LA BASE DE DATO
  async UpdateMovie(updateemoviesdto: UpdateMovieDto): Promise<{ success: boolean; movie: MoviesEntity }> {
    const { id, title, director, score } = updateemoviesdto;
    console.log("Movie ID:", id);
    try {
      // 1. Encuentra la película por ID
      const movie = await MoviesModel.findById(id);
  
      if (!movie) {
        throw new Error(`Película no encontrada para el ID: ${id}`);
      }
      
  
      // 2. Validación de datos de entrada
      if (!title || !director || !score) {
        throw new Error("Datos de entrada incompletos");
      }
  
      // 3. Genera el slug
      const slug = slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });
  
      // 4. Actualiza las propiedades de la película
      movie.title = title;
      movie.slug = slug;
      movie.director = director;
      movie.score = score;
      movie.updatedAt = new Date();
  
      // 5. Guarda la película actualizada
      const updatedMovie = await movie.save();
  
      // 6. Mapea la respuesta a nuestra entidad
      const movieEntity = MoviesMapper.MoviesEntityFromObject(updatedMovie.toObject());
  
      // 7. Devuelve la entidad actualizada
      return { success: true, movie: movieEntity };
    } catch (error) {
      console.error("Error al actualizar la película:", error);
  
      if (error instanceof CustomError) {
        throw error;
      }
  
      // 8. Devuelve un objeto de error
      throw new Error("Error al registrar la película");
    }
  }
  
  

  //ESTE ENDPOINT SIRVE PARA CREAR UNA PELICULA Y ALMACENARLA EN LA BASE DE DATO
  async register(registemoviesdto: RegisteMovieDto): Promise<MoviesEntity> {
    const { title, director, score } = registemoviesdto;
    console.log(title, director, score);
    try {
      // 1. Verifica si la película existe
      const exist = await MoviesModel.findOne({ title: title });
      if (exist) {
        throw new Error("La película ya existe");
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
        createdAt: new Date(),
      });
  
      // 4. Mapea la respuesta a nuestra entidad
      const movieEntity = MoviesMapper.MoviesEntityFromObject(movie.toObject());
  
      // 5. Devuelve la entidad
      return movieEntity;
    } catch (error) {
      console.error("Error al registrar la película:", error);
      
      if (error instanceof CustomError) {
        throw error;
      }
      
      throw new Error("Error al registrar la película");
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
