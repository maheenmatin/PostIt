import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../auth/shared/auth.service";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SubredditService } from "../subreddit/subreddit.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule, NgbModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  faUser = faUser;
  isLoggedIn: boolean = false;
  username: string = "";

  constructor(private authService: AuthService, private router: Router, private subredditService: SubredditService) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => (this.isLoggedIn = data));
    this.authService.username.subscribe((data: string) => (this.username = data));
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl("/user-profile/" + this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl("");
  }

  filterSubreddit(): void {
    this.subredditService.setSelectedSubreddit(undefined);
  }
}
