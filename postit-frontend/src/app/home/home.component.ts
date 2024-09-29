import { Component } from "@angular/core";
import { PostTileComponent } from "../shared/post-tile/post-tile.component";
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { SubredditSideBarComponent } from "../shared/subreddit-side-bar/subreddit-side-bar.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [PostTileComponent, SideBarComponent, SubredditSideBarComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }
}
