import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
})
export class SideBarComponent {
  // Customizable welcome text for different pages.
  @Input() welcomeText = "Welcome to the PostIt home page! Feel free to relax and check in with your favorite communities...";
  constructor(private router: Router) {}

  // Route helpers for CTA buttons.
  goToCreatePost() {
    this.router.navigateByUrl("/create-post");
  }

  goToCreateCommunity() {
    this.router.navigateByUrl("/create-community");
  }
}
