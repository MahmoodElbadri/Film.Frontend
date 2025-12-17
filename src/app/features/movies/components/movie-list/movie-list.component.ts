import {Component, inject, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDto} from '../../models/movie-dto';
import {DatePipe} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {

  //injections
  movieService = inject(MovieService);
  toastr = inject(ToastrService);
  //variables
  movieList!: MovieDto[];
  pageNumber: number = 1;
  pageSize: number = 6;


  ngOnInit(): void {
    // this.getAllMovies();
    this.getPaged();
  }

  getPaged(){
    this.movieService.getPaged(this.pageNumber, this.pageSize).subscribe({
      next:(response)=>{
        this.movieList = response.items;
      },
      error:(err)=>{
        this.toastr.error('Failed to load movies');
        console.log(err);
      }
    })
  }

  deleteMovie(arg0: number) {
    this.movieService.deleteMovie(+arg0).subscribe({
      next: (res) => {
        this.getAllMovies();
      },
      error: (err) => {
        this.toastr.error('Movie deleting failed');
        console.log(err);
      }
    })
  }

  getAllMovies() {
    this.movieService.getAll().subscribe({
      next: (res) => {
        this.movieList = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
