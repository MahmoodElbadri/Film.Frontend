import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {UpSertMovie} from '../models/create-movie';
import {MovieDto} from '../models/movie-dto';
import {PagedResult} from '../models/pagedResult';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getAll() {
    return this.http.get<MovieDto[]>(`${this.baseUrl}movies/all`);
  }

  getPaged(pageNumber: number, pageSize: number, searchTerm: string) {
    return this.http.get<PagedResult<MovieDto>>(`${this.baseUrl}movies`, {
      params: {
        pageNumber,
        pageSize,
        searchTerm
      }
    });
  }

  getMovieById(id: number) {
    return this.http.get<MovieDto>(`${this.baseUrl}movies/${id}`);
  }

  updateMovie(id: number, model: UpSertMovie) {
    return this.http.put(`${this.baseUrl}movies/${id}`, model);
  }

  createMovie(model: UpSertMovie) {
    return this.http.post(`${this.baseUrl}movies`, model);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${this.baseUrl}movies/${id}`);
  }

}
