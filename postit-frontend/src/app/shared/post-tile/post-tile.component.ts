import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { PostModel } from "../post-model";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { VoteButtonComponent } from "../vote-button/vote-button.component";
import { Subscription } from "rxjs";
import { SubredditService } from "../../subreddit/subreddit.service";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-tile",
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, VoteButtonComponent],
  templateUrl: "./post-tile.component.html",
  styleUrl: "./post-tile.component.css",
})
export class PostTileComponent {
  faComments = faComments;
  posts: PostModel[] = [];
  postsFiltered: PostModel[] = [];
  private subredditSubscription!: Subscription;

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {}

  async ngOnInit() {
    try {
      this.posts = await this.postService.getAllPostsAsync();
      this.filterPosts(this.subredditService.getSelectedSubreddit());
      console.log(this.subredditService.getSelectedSubreddit());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  filterPosts(selectedSubreddit: String | undefined): void {
    if (this.posts) {
      this.postsFiltered = selectedSubreddit
        ? this.posts.filter((post) => post.subredditName === selectedSubreddit)
        : this.posts;
    }
  }

  goToPost(id: number): void {
    this.router.navigateByUrl("/view-post/" + id);
  }
}
