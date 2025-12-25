import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SignupRequestPayload } from "./signup-request.payload";
import { AuthService } from "../shared/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(255)]),
  });
  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.signupRequestPayload = {
      username: "",
      email: "",
      password: "",
    };
  }

  signup() {
    // Build payload from form values.
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.signupRequestPayload.email = this.signupForm.get("email")?.value;
    this.signupRequestPayload.username = this.signupForm.get("username")?.value;
    this.signupRequestPayload.password = this.signupForm.get("password")?.value;

    this.authService.signup(this.signupRequestPayload).subscribe({
      next: (response) => {
        // Redirect to login with a query param for the success banner.
        this.router.navigate(["/login"], {
          queryParams: {
            registered: "true",
            requiresEmailVerification: response.requiresEmailVerification ? "true" : "false",
          },
        });
      },
      error: (error) => {
        const conflictErrors = Array.isArray(error?.error?.errors) ? error.error.errors : [];
        if (conflictErrors.length > 0) {
          conflictErrors.forEach((message: string) => this.toastr.error(message));
          return;
        }

        this.toastr.error("Registration failed. Please try again.");
      },
    });
  }
}
