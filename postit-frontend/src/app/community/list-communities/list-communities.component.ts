import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CommunityModel } from "../community.model";
import { CommunityService } from "../community.service";

@Component({
  selector: "app-list-communities",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./list-communities.component.html",
  styleUrl: "./list-communities.component.css",
})
export class ListCommunitiesComponent {
  communities: Array<CommunityModel> = [];

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe({
      next: (data) => {
        this.communities = data;
      },
      error: (error) => console.error("Error loading communities", error),
    });
  }
}
