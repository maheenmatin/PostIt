import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CommunityService } from "../community.service";
import { PostService } from "../../shared/post.service";
import { CommunityModel } from "../community.model";
import { PostModel } from "../../shared/post-model";
import { PostTileComponent } from "../../shared/post-tile/post-tile.component";

@Component({
  selector: "app-view-community",
  standalone: true,
  imports: [CommonModule, PostTileComponent],
  templateUrl: "./view-community.component.html",
  styleUrl: "./view-community.component.css",
})
export class ViewCommunityComponent {
  communityId: number;
  community?: CommunityModel;
  posts: PostModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityService: CommunityService,
    private postService: PostService
  ) {
    // Route param is required for community lookup.
    this.communityId = Number(this.activatedRoute.snapshot.params["id"]);
  }

  ngOnInit(): void {
    // Load both community metadata and its scoped posts.
    this.loadCommunity();
    this.loadPosts();
  }

  private loadCommunity(): void {
    // Fetch details for the community header.
    this.communityService.getCommunity(this.communityId).subscribe({
      next: (community) => {
        this.community = community;
      },
      error: (error) => console.error("Error loading community", error),
    });
  }

  private loadPosts(): void {
    // Fetch posts scoped to the selected community.
    this.postService.getPostsByCommunity(this.communityId).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => console.error("Error loading community posts", error),
    });
  }
}
