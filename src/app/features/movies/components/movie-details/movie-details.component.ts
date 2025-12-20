import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDto} from '../../models/movie-dto';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    SwalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  // Injections
  movieService = inject(MovieService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  // ViewChild references
  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;

  // Variables
  movie!: MovieDto;
  commentForm!: FormGroup;
  id: number = 0;
  comments: Comment[] = [];
  ratingValue: number = 0; // For star rating display

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getMovieById(this.id);
    this.initializeCommentForm();
  }

  initializeCommentForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(3)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    // Watch for rating changes to update display
    this.commentForm.get('rating')?.valueChanges.subscribe(value => {
      this.ratingValue = value;
    });
  }

  // Set rating via stars
  setRating(value: number) {
    this.ratingValue = value;
    this.commentForm.get('rating')?.setValue(value);
    this.commentForm.get('rating')?.markAsTouched();
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Submit comment form
  onSubmitComment() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      console.log('Comment submitted:', commentData);

      // Here you would typically call a service to save the comment
      // For example: this.movieService.addComment(this.id, commentData).subscribe(...)

      // Reset form after submission
      this.commentForm.reset();
      this.ratingValue = 0;

      // Show success message or update comments list
    } else {
      // Mark all fields as touched to show validation errors
      this.commentForm.markAllAsTouched();
    }
  }
}
