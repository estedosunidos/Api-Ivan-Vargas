import { Request, Response } from "express";
import { MoviesRepository } from "../../domain/repositorios/movies.repositorios";
import { CustomError } from "../../domain/error/custom.error";
import { RegisteMovieDto } from "../../domain/dtos/RegisterMoviesDto";
import { UpdateMovieDto } from "../../domain/dtos/UpdateMovieDto";
import { CloneMovieDto } from "../../domain/dtos/clonamoviesDto";
import { PaginacionMovieDto } from "../../domain/dtos/PaginacionDto";
import { AssignMovieToPlatformDto } from "../../domain/dtos/AssignMovieToPlatformDto";
import { CreateReviewDto } from "../../domain/dtos/CreateReviewDto ";
import { DeleteMovieDto } from "../../domain/dtos/DeleteMovieDto";
import {  GetByIdMoviesDTP } from "../../domain/dtos/GetByIdMovies";
export class MoviesController {
  constructor(private readonly moviesRepository: MoviesRepository) {}
  private handleErrror = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.message);
    }
    //console.log(error)
    //return res.status(500).json({error:'Internal Server Error'})
  };
  Assignartoreviewtomovies = async (req: Request, res: Response) => {
    const [error, createReviewDto] = CreateReviewDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .createReview(createReviewDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
  registerMovies = async (req: Request, res: Response) => {
    const [error, registerMoviesDto] = RegisteMovieDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .register(registerMoviesDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
   Clonapelicula =async(req:Request,res:Response)=>{
    console.log(req.params)
    const [error, cloneMovieDto] = CloneMovieDto.create(req.params)
    console.log(cloneMovieDto);

    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const clonedMovie = await this.moviesRepository.cloneMovie(cloneMovieDto!);
      res.status(200).json({ data: clonedMovie });
    } catch (error) {
      console.error('Error clonando película:', error);
      res.status(500).json({ error: 'Error al clonar la película.' });
    }
  
     }
  Paginacionpelicula = async (req: Request, res: Response) => {
    console.log(req.params);
    const [error, paginacionMovieDto] = PaginacionMovieDto.create(req.params);
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .PaginacionMovie(paginacionMovieDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };

  readMovies = async (req: Request, res: Response) => {
    // El método `readMovies` no parece necesitar un DTO en el cuerpo de la solicitud.
    // Si no es necesario, puedes omitir el uso de `RegisterMoviesDto`.
    console.log("jjsdjdj");
    this.moviesRepository
      .readMovies()
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
  UpdadeMovies = async (req: Request, res: Response) => {
    console.log(req.body);
    const [error, updateMovieDto] = UpdateMovieDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .UpdateMovie(updateMovieDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
  Assignartoplatformtomovies = async (req: Request, res: Response) => {
    const [error, assignMovieToPlatformDto] = AssignMovieToPlatformDto.assigner(
      req.body
    );
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .assignMovieToPlatform(assignMovieToPlatformDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
  deleteMovies = async (req: Request, res: Response) => {
    const [error, deleteMovieDto] = DeleteMovieDto.create(req.params);
    if (error) return res.status(400).json({ error });
    this.moviesRepository
      .deleteMovie(deleteMovieDto!)
      .then((response) => res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
  moviebyid = async (req: Request, res: Response) => {
    console.log(req.params)
    const [error, getByIdMoviesDTP] = GetByIdMoviesDTP.assigner(
      req.params
    );
    
    if (error) return res.status(400).json({ error });
    this.moviesRepository.GetByIdMovie(getByIdMoviesDTP!)
      .then((response) =>res.status(200).send({data: response}))
      .catch((error) => res.status(500).json(error))
      .catch((error) => this.handleErrror(error, res));
  };
}
