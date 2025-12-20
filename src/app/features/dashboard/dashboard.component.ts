import {Component, inject, OnInit} from '@angular/core';
import {MovieService} from '../movies/services/movie.service';
import {MovieDto} from '../movies/models/movie-dto';
import {ToastrService} from "ngx-toastr";
import {DatePipe, PercentPipe} from '@angular/common';
import {PieChartModule} from '@swimlane/ngx-charts';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PieChartModule,
    DatePipe,
    RouterLink,
    PercentPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  //injections
  moviesService = inject(MovieService);
  toastr = inject(ToastrService);
  //variables
  last5Added!: MovieDto[];
  moviesNumber: number = 0;
  comedyMoviesNumber: number = 0;
  actionMoviesNumber: number = 0;
  dramaMoviesNumber: number = 0;
  saleData: any[] = [];
  view: [number, number] = [700, 400];
  today: Date = new Date();
  // Options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  ngOnInit(): void {
    this.getMovies();
  }

  setPieChart() {
    this.saleData = [
      {name: "comedy ", value: this.comedyMoviesNumber},
      {name: "action ", value: this.actionMoviesNumber},
      {name: "drama", value: this.dramaMoviesNumber},
    ];
  }

  getMovies() {
    this.moviesService.getAll().subscribe({
      next: (res) => {
        this.moviesNumber = res.length;
        this.last5Added = res.slice(0, 5);
        this.actionMoviesNumber = res.filter((movie) => movie.genre === 'Action').length;
        this.comedyMoviesNumber = res.filter((movie) => movie.genre === 'Comedy').length;
        this.dramaMoviesNumber = res.filter((movie) => movie.genre === 'Drama').length;
        this.setPieChart();
      },
      error: (err) => {
        this.toastr.error('failed to load movies');
        console.log(err);
      }
    })
  }
}
