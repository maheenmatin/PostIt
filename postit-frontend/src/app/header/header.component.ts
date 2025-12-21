import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../auth/shared/auth.service";
import { CommunityService } from "../community/community.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule, NgbModule, FontAwesomeModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  faUser = faUser;
  isLoggedIn = false;
  username = "";

  constructor(private authService: AuthService, private router: Router, private communityService: CommunityService) {}

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

  filterCommunity(): void {
    this.communityService.setSelectedCommunity(undefined);
  }
}
