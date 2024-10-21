import { Component } from "@angular/core";
import { PostTileComponent } from "../shared/post-tile/post-tile.component";
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
}
