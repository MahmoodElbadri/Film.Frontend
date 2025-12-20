import {Component, inject, input, OnInit} from '@angular/core';
import {CommentDto} from '../models/comment-dto';
import {CommentService} from '../services/review.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent implements OnInit {


  // Injections
  commentService = inject(CommentService);
  toastr = inject(ToastrService);

  // Variables
  id = input.required<number>();
  comments: CommentDto[] = [];

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    const movieId = this.id();
    this.commentService.getAll(movieId).subscribe({
      next:(response)=>{
        this.comments = response;
      },
      error:(err)=>{
       this.toastr.error(`Can't get comments because: ${err.error}`);
      }
    })
  }

}
