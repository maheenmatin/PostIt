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
    name: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    description: new FormControl<string>("", { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
  });

  constructor(private router: Router, private communityService: CommunityService) {}

  createCommunity() {
    // Guard required fields and submit creation request.
    if (this.createCommunityForm.invalid) {
      this.createCommunityForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.createCommunityForm.getRawValue(); // both are string

    const communityModel: CommunityModel = { name, description };

    this.communityService.createCommunity(communityModel).subscribe({
      next: (community) => this.router.navigate(["/community", community.communityId]),
      error: (error) => console.error("Error creating community", error),
    });
  }

  discardCommunity() {
    // Return to the home page without saving.
    this.router.navigateByUrl("/");
  }
}
