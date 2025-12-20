import {Component, inject, OnInit} from '@angular/core';
import {UpSertMovie} from '../../models/create-movie';
import {MovieService} from '../../services/movie.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
})
export class MovieFormComponent implements OnInit {
  //variables
  upsertMovie: UpSertMovie = {} as UpSertMovie;
  addMovieForm!: FormGroup;
  isAdd: boolean = true;
  id: number = 0;
  //injections
  movieService = inject(MovieService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  initializeForm() {
    this.addMovieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200),]],
      releaseDate: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      posterUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*(?:\\.jpg|\\.jpeg|\\.png|\\.gif|\\.bmp|\\.webp|\\.img)(?:\\?.*)?$')]],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isAdd = false;
        this.id = params['id'];
      }
    });
    if (!this.isAdd) {
      this.getMovieById(this.id);
    }
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe({
      next: (res) => {
        this.upsertMovie = res;
        this.addMovieForm.patchValue(this.upsertMovie);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(model: UpSertMovie) {
    model.releaseDate = new Date(model.releaseDate);
    if (this.isAdd) {
      this.movieService.createMovie(model).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.toastr.success('Movie added successfully');
        },
        error: (err) => {
          this.toastr.error('Movie adding failed');
        },
      });
    } else {
      this.movieService.updateMovie(this.id, model).subscribe({
        next: () => {
          this.toastr.success('Movie updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.error('Movie updating failed');
          console.log(err);
        },
      });
    }
  }
}
