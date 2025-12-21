import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PostTileComponent } from "../shared/post-tile/post-tile.component";
import { CommentPayload } from "../comment/comment.payload";
import { CommentService } from "../comment/comment.service";
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [PostTileComponent, CommonModule, RouterModule],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  name: string;
  posts: PostModel[] = [];
  comments: CommentPayload[] = [];
  postLength = 0;
  commentLength = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    // Pull the username from the route to load profile data.
    this.name = this.activatedRoute.snapshot.params["name"];

    // Load post history for the user.
    this.postService.getPostsByUser(this.name).subscribe({
      next: (data) => {
        this.posts = data;
        this.postLength = data.length;
      },
      error: (error) => console.error("Error loading posts", error),
    });

    // Load comment history for the user.
    this.commentService.getAllCommentsByUser(this.name).subscribe({
      next: (data) => {
        this.comments = data.map((comment) => ({
          ...comment,
          createdDate: comment.createdDate ? this.formatDate(comment.createdDate) : comment.createdDate,
        }));
        this.commentLength = data.length;
      },
      error: (error) => console.error("Error loading comments", error),
    });
  }

  private formatDate(dateInput: string): string {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return dateInput;
    }

    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  }
}
