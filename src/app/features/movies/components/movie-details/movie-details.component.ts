import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {MovieDto} from '../../models/movie-dto';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ReviewsListComponent} from '../../../Comments/reviews-list/reviews-list.component';
import {ReviewService} from '../../../Comments/services/review.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    SwalComponent,
    ReactiveFormsModule,
    ReviewsListComponent
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
  toastr = inject(ToastrService);


  // ViewChild references
  @ViewChild('deleteSwal') deleteSwal!: SwalComponent;
  @ViewChild(ReviewsListComponent) reviewsList!: ReviewsListComponent;

  // Variables
  protected movie!: MovieDto;
  protected commentForm!: FormGroup;
  protected id: number = 0;
  // comments: Comment[] = [];
  protected avgRating!: number;
  protected ratingValue: number = 0; // For star rating display
  private reviewService = inject(ReviewService);

  constructor() {
    this.id = Number(this.route.snapshot.params['id']);
    this.toastr.info(`Movie ID: ${this.id} and the data type is ${typeof this.id}`);
  }

  ngOnInit(): void {
    this.getMovieById(this.id);
    this.initializeCommentForm();
    this.getAvgRating(this.id);
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

  getAvgRating(movieId: number){
    this.movieService.getAvgRating(movieId).subscribe({
      next:(res)=>{
        this.avgRating = res;
      },
      error:(err)=>{
        this.toastr.error('Failed to get movie average rating')
      }
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
        this.toastr.error(`Can't get movie because: ${err.error}`);
      }
    });
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(`Can't delete movie because: ${err.error}`);
      }
    });
  }

  // Submit comment form
  onSubmitComment() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      commentData.movieId = this.id;
      console.log('Comment submitted:', commentData);

      this.reviewService.addReview(commentData).subscribe({
        next:()=>{
          this.toastr.success('Comment added successfully');
          this.reviewsList.getComments();
        },
        error:(err)=>{
          this.toastr.error(`Can't add review because: ${err.error}`);
        }
      })

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
