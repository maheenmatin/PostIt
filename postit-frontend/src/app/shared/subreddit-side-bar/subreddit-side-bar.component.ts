import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SubredditModel } from "../../subreddit/subreddit-response";
import { SubredditService } from "../../subreddit/subreddit.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-subreddit-side-bar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./subreddit-side-bar.component.html",
  styleUrl: "./subreddit-side-bar.component.css",
})
export class SubredditSideBarComponent {
  subreddits: Array<SubredditModel> = [];
  displayViewAll!: boolean;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe((data) => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }
}
