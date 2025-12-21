import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CommunityModel } from "../../community/community.model";
import { CommunityService } from "../../community/community.service";

@Component({
  selector: "app-community-side-bar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./community-side-bar.component.html",
  styleUrl: "./community-side-bar.component.css",
})
export class CommunitySideBarComponent {
  communities: Array<CommunityModel> = [];

  constructor(private communityService: CommunityService) {
    // Pull a small list of communities to highlight on the sidebar.
    this.communityService.getAllCommunities().subscribe({
      next: (data) => {
        this.communities = data.length > 3 ? data.slice(0, 3) : data;
      },
      error: (error) => console.error("Error loading communities", error),
    });
  }
}
