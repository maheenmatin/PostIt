import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CommunityModel } from "../community.model";
import { CommunityService } from "../community.service";
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { CommunitySideBarComponent } from "../../shared/community-side-bar/community-side-bar.component";

@Component({
  selector: "app-list-communities",
  standalone: true,
  imports: [CommonModule, RouterModule, SideBarComponent, CommunitySideBarComponent],
  templateUrl: "./list-communities.component.html",
  styleUrl: "./list-communities.component.css",
})
export class ListCommunitiesComponent {
  communities: Array<CommunityModel> = [];

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    // Load the full community list for the directory view.
    this.communityService.getAllCommunities().subscribe({
      next: (data) => {
        this.communities = data;
      },
      error: (error) => console.error("Error loading communities", error),
    });
  }
}
