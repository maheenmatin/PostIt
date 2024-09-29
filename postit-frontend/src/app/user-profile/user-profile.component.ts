import { Component } from "@angular/core";
import { PostTileComponent } from "../shared/post-tile/post-tile.component";
import { ActivatedRoute } from "@angular/router";
import { CommentPayload } from "../comment/comment.payload";
import { CommentService } from "../comment/comment.service";
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [PostTileComponent, CommonModule],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postLength!: number;
  commentLength!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.name = this.activatedRoute.snapshot.params["name"];

    this.postService.getAllPostsByUser(this.name).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe((data) => {
      this.comments = data;
      this.commentLength = data.length;
      this.convertToDate();
    });
  }

  ngOnInit(): void {}

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
