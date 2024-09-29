import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { PostModel } from "../../shared/post-model";
import { PostService } from "../../shared/post.service";
import { CommentPayload } from "../../comment/comment.payload";
import { CommentService } from "../../comment/comment.service";
import { SubredditSideBarComponent } from "../../shared/subreddit-side-bar/subreddit-side-bar.component";
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { VoteButtonComponent } from "../../shared/vote-button/vote-button.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-view-post",
  standalone: true,
  imports: [SubredditSideBarComponent, SideBarComponent, ReactiveFormsModule, VoteButtonComponent, CommonModule],
  templateUrl: "./view-post.component.html",
  styleUrl: "./view-post.component.css",
})
export class ViewPostComponent {
  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {
    this.postId = this.activateRoute.snapshot.params["id"]; // updated syntax

    this.commentForm = new FormGroup({
      text: new FormControl("", Validators.required),
    });
    this.commentPayload = {
      text: "",
      postId: this.postId,
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get("text")!.value;
    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        this.commentForm.get("text")!.setValue("");
        this.getCommentsForPost();
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(
      (data) => {
        this.comments = data;
        this.convertToDate();
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private convertToDate() {
    if (this.comments && this.comments.length > 0) {
      this.comments.forEach((comment) => {
        if (comment.createdDate) {
          const timestamp = parseFloat(comment.createdDate);
          const date = new Date(timestamp * 1000);

          const londonTime = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London",
            dateStyle: "short",
            timeStyle: "short",
          }).format(date);

          comment.createdDate = londonTime;
        }
      });
    }
  }
}
