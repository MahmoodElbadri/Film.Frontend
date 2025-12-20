import {Component, inject, input, OnInit} from '@angular/core';
import {ReviewDto} from '../models/comment-dto';
import { ToastrService } from "ngx-toastr";
import {ReviewService} from '../services/review.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent implements OnInit {


  // Injections
  private reviewService = inject(ReviewService);
  private toastr = inject(ToastrService);

  // Variables
  protected id = input.required<number>();
  protected currentId:number = 0;
  protected reviewDtos: ReviewDto[] = [];

  ngOnInit(): void {
    this.getComments();
  }

  public getComments(){
    const movieId = this.id();
    this.reviewService.getAll(movieId).subscribe({
      next:(response)=>{
        this.currentId = movieId;
        this.reviewDtos = response; //here
      },
      error:(err)=>{
       this.toastr.error(`Can't get comments because: ${err.error}`);
      }
    })
  }

}
