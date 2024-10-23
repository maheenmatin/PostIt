import { Component, Input } from "@angular/core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PostModel } from "../post-model";
import { PostService } from "../post.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../auth/shared/auth.service";
import { throwError } from "rxjs";
import { VoteService } from "../vote.service";
import { VotePayload } from "./vote-payload";
import { VoteType } from "./vote-type";
import { LocalStorageService } from "ngx-webstorage";

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
  isLoggedIn!: boolean;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
  ) {
    this.authService.loggedIn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
      console.log(this.isLoggedIn);
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
    if (this.localStorage.retrieve("loggedIn") === "false" || undefined) {
      this.toastr.error("Login to vote!");
      return;
    }
    
    this.voteService.vote(this.createVotePayload()).subscribe(
      () => {
        this.updateVoteDetails();
      },
      (error) => {
        this.toastr.error((this.voteType === VoteType.UPVOTE) ? "You have already upvoted!" : "You have already downvoted!");
        throwError(error);
      }
    );
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe((post) => {
      this.post = post;
    });
  }

  private createVotePayload() {
    return {
      voteType: this.voteType,
      postId: this.post.id,
    };
  }
}
