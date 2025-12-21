import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../auth/shared/auth.service";
import { CommunityService } from "../community/community.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, CommonModule, NgbModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  isLoggedIn = false;
  username = "";

  constructor(private authService: AuthService, private router: Router, private communityService: CommunityService) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => (this.isLoggedIn = data));
    this.authService.username.subscribe((data: string) => (this.username = data));
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
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
