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
  @Input() welcomeText = "Welcome to the PostIt home page! Feel free to relax and check in with your favorite communities...";
  constructor(private router: Router) {}

  goToCreatePost() {
    this.router.navigateByUrl("/create-post");
  }

  goToCreateCommunity() {
    this.router.navigateByUrl("/create-community");
  }
}
