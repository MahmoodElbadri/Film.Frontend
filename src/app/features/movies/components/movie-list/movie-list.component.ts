import {Component, inject, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDto} from '../../models/movie-dto';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,
    FormsModule,
    SwalComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {

  //injections
  private movieService = inject(MovieService);
  private toastr = inject(ToastrService);
  //variables
  protected movies!: MovieDto[];
  protected total = 0;
  protected pageNumber = 1;
  protected pageSize = 6;                 // items per page
  protected pages: number[] = [];
  protected searchTerm = '';
  protected searchTimeOut: any;


  ngOnInit(): void {
    // this.getAllMovies();
    // this.getPaged();
    this.loadPage();
  }

  loadPage(searchTerm?: string): void { //this method to delay the ngModelChange cause it instantly
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(()=>{
      this.movieService.getPaged(this.pageNumber, this.pageSize,this.searchTerm).subscribe(res => {
        this.movies = res.items;
        this.total = res.totalCount;
        this.buildPageArray();
      });
    }, 500)
  }

  buildPageArray(): void {
    const pagesCount = Math.ceil(this.total / this.pageSize);
    this.pages = Array.from({length: pagesCount}, (_, i) => i + 1);
  }

  goTo(page: number): void {
    this.pageNumber = page;
    this.loadPage();
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
        this.movies = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
