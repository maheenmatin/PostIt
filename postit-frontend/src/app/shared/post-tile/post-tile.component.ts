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
  // Optional posts list for parent-provided feeds (community/profile).
  @Input() posts: PostModel[] = [];
  // Skip filtering when parent already scoped the list.
  @Input() disableCommunityFilter = false;
  // Avoid auto-loading all posts if parent passed data.
  @Input() useProvidedPosts = false;
  faComments = faComments;
  postsFiltered: PostModel[] = [];
  communityIdByName: Record<string, number> = {};

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService) {}

  ngOnInit() {
    // Preload community name → id lookups for router links.
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

    // Load the feed only when not receiving posts from a parent component.
    if (!this.useProvidedPosts && this.posts.length === 0) {
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
    // Default feed for the home page.
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyCommunityFilter();
      },
      error: (error) => console.error("Error fetching posts:", error),
    });
  }

  private applyCommunityFilter(): void {
    // Apply stored selection only when the parent hasn't pre-filtered.
    if (this.disableCommunityFilter) {
      this.postsFiltered = this.posts;
      return;
    }

    const selectedCommunity = this.communityService.getSelectedCommunity();
    this.postsFiltered = selectedCommunity
      ? this.posts.filter((post) => post.communityName === selectedCommunity)
      : this.posts;
  }

  goToPost(id: number): void {
    this.router.navigateByUrl("/view-post/" + id);
  }

  // Build router link to community detail from a community name.
  communityRoute(name: string): Array<string | number> | null {
    const communityId = this.communityIdByName[name];
    if (!communityId) {
      return null;
    }
    return ["/community", communityId];
  }

  // Render a pluralized comment label for the UI.
  commentLabel(count: number): string {
    const normalized = Number(count) || 0;
    return `${normalized} ${normalized === 1 ? "comment" : "comments"}`;
  }

  goToCreatePost() {
    this.router.navigateByUrl("/create-post");
  }
}
