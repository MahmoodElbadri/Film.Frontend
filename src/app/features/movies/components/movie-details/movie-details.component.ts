import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDto} from '../../models/movie-dto';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    SwalComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  //injections
  movieService = inject(MovieService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // ViewChild references
  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;

  //variables
  movie!: MovieDto;
  id: number = 0;

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getMovieById(this.id);
  }

  getMovieById(id: number){
    this.movieService.getMovieById(id).subscribe({
      next:(response)=>{
        this.movie = response;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  protected deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe({
      next:()=>{
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
