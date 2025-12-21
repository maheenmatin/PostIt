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
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
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
    this.signupRequestPayload.email = this.signupForm.get("email")?.value;
    this.signupRequestPayload.username = this.signupForm.get("username")?.value;
    this.signupRequestPayload.password = this.signupForm.get("password")?.value;

    this.authService.signup(this.signupRequestPayload).subscribe({
      next: () => {
        // Redirect to login with a query param for the success banner.
        this.router.navigate(["/login"], { queryParams: { registered: "true" } });
      },
      error: (error) => {
        // Attempt to detect duplicate username/email errors.
        const backendMessage = (error?.error?.message || error?.error?.error || "").toString().toLowerCase();
        const duplicateError =
          error?.status === 409 ||
          backendMessage.includes("exists") ||
          backendMessage.includes("duplicate") ||
          backendMessage.includes("unique");
        this.toastr.error(
          duplicateError
            ? "Username or email already exists. Please try another."
            : "Registration failed. Please try again."
        );
      },
    });
  }
}
