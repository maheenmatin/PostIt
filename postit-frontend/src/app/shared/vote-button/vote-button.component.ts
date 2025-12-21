import { Component, Input } from "@angular/core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ToastrService } from "ngx-toastr";
import { PostModel } from "../post-model";
import { PostService } from "../post.service";
import { AuthService } from "../../auth/shared/auth.service";
import { VoteService } from "../vote.service";
import { VoteType } from "./vote-type";

@Component({
  selector: "app-vote-button",
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: "./vote-button.component.html",
  styleUrl: "./vote-button.component.css",
})
export class VoteButtonComponent {
  @Input() post!: PostModel;
  voteType!: VoteType;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn = false;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {
    this.authService.loggedIn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = "";
  }

  downvotePost() {
    this.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = "";
  }

  private vote() {
    if (!this.authService.isLoggedIn()) {
      this.toastr.error("Login to vote!");
      return;
    }

    this.voteService.vote(this.createVotePayload()).subscribe({
      next: () => {
        this.updateVoteDetails();
      },
      error: () => {
        this.toastr.error(this.voteType === VoteType.UPVOTE ? "You have already upvoted!" : "You have already downvoted!");
      },
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.postId).subscribe((post) => {
      this.post = post;
    });
  }

  private createVotePayload() {
    return {
      voteType: this.voteType,
      postId: this.post.postId,
    };
  }
}
