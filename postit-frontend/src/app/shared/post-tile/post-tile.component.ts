import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { PostModel } from "../post-model";
import { VoteButtonComponent } from "../vote-button/vote-button.component";
import { CommunityService } from "../../community/community.service";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-tile",
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, VoteButtonComponent],
  templateUrl: "./post-tile.component.html",
  styleUrl: "./post-tile.component.css",
})
export class PostTileComponent implements OnInit, OnChanges {
  @Input() posts: PostModel[] = [];
  faComments = faComments;
  postsFiltered: PostModel[] = [];

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService) {}

  ngOnInit() {
    if (this.posts.length === 0) {
      this.loadPosts();
    } else {
      this.applyCommunityFilter();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["posts"]) {
      this.applyCommunityFilter();
    }
  }

  private loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyCommunityFilter();
      },
      error: (error) => console.error("Error fetching posts:", error),
    });
  }

  private applyCommunityFilter(): void {
    const selectedCommunity = this.communityService.getSelectedCommunity();
    this.postsFiltered = selectedCommunity
      ? this.posts.filter((post) => post.communityName === selectedCommunity)
      : this.posts;
  }

  goToPost(id: number): void {
    this.router.navigateByUrl("/view-post/" + id);
  }
}
