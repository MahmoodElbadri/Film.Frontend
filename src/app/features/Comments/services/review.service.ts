import {inject, Injectable} from '@angular/core';
import {CreateReview} from '../../movies/models/create-review';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {CommentDto} from '../models/comment-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  addReview(model: CreateReview) {
    return this.http.post(`${this.baseUrl}Reviews`, model);
  }

  getAll(movieId: number) {
    return this.http.get<CommentDto[]>(`${this.baseUrl}Reviews`, {
      params: { movieId: movieId.toString() }
    });
  }
}
