import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CommunityModel } from "../community.model";
import { CommunityService } from "../community.service";

@Component({
  selector: "app-create-community",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./create-community.component.html",
  styleUrl: "./create-community.component.css",
})
export class CreateCommunityComponent {
  createCommunityForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });
  communityModel: CommunityModel = {
    name: "",
    description: "",
  };

  constructor(private router: Router, private communityService: CommunityService) {}

  createCommunity() {
    // Guard required fields and submit creation request.
    const { name, description } = this.createCommunityForm.value;
    if (!name || !description) {
      return;
    }

    this.communityModel = {
      name,
      description,
    };

    this.communityService.createCommunity(this.communityModel).subscribe({
      next: () => this.router.navigateByUrl("/list-communities"),
      error: (error) => console.error("Error creating community", error),
    });
  }

  discardCommunity() {
    // Return to the home page without saving.
    this.router.navigateByUrl("/");
  }
}
