import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PostModel } from "../../shared/post-model";
import { PostService } from "../../shared/post.service";
import { CommentPayload } from "../../comment/comment.payload";
import { CommentService } from "../../comment/comment.service";
import { CommunitySideBarComponent } from "../../shared/community-side-bar/community-side-bar.component";
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { VoteButtonComponent } from "../../shared/vote-button/vote-button.component";
import { CommunityService } from "../../community/community.service";

@Component({
  selector: "app-view-post",
  standalone: true,
  imports: [
    CommunitySideBarComponent,
    SideBarComponent,
    ReactiveFormsModule,
    VoteButtonComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: "./view-post.component.html",
  styleUrl: "./view-post.component.css",
})
export class ViewPostComponent {
  postId: number;
  post!: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[] = [];
  communityIdByName: Record<string, number> = {};

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private communityService: CommunityService
  ) {
    // Resolve post id from route for initial data fetch.
    this.postId = this.activateRoute.snapshot.params["id"];

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required, Validators.maxLength(255)]),
    });
    this.commentPayload = {
      text: "",
      postId: this.postId,
    };
  }

  ngOnInit(): void {
    // Load community lookup map and post/comments for the page.
    this.communityService.getAllCommunities().subscribe({
      next: (communities) => {
        this.communityIdByName = communities.reduce<Record<string, number>>((acc, community) => {
          if (community.communityId) {
            acc[community.name] = community.communityId;
          }
          return acc;
        }, {});
      },
      error: (error) => console.error("Error loading communities", error),
    });

    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    // Guard empty submissions and refresh list on success.
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    const { text } = this.commentForm.value;

    this.commentPayload.text = text;
    this.commentService.postComment(this.commentPayload).subscribe({
      next: () => {
        this.commentForm.reset();
        this.getCommentsForPost();
      },
      error: (error) => console.error("Error posting comment", error),
    });
  }

  private getPostById() {
    // Pull post detail for the header/metadata block.
    this.postService.getPost(this.postId).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => console.error("Error fetching post", error),
    });
  }

  private getCommentsForPost() {
    // Load comments and format timestamps for display.
    this.commentService.getAllCommentsForPost(this.postId).subscribe({
      next: (data) => {
        this.comments = data.map((comment) => ({
          ...comment,
          createdDate: comment.createdDate ? this.formatDate(comment.createdDate) : comment.createdDate,
        }));
      },
      error: (error) => console.error("Error fetching comments", error),
    });
  }

  private formatDate(dateInput: string): string {
    // Normalize backend timestamp to a user-friendly string.
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

  communityRoute(name: string): Array<string | number> | null {
    const communityId = this.communityIdByName[name];
    if (!communityId) {
      return null;
    }
    return ["/community", communityId];
  }
}
