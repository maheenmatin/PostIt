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
    this.signupRequestPayload.email = this.signupForm.get("email")?.value;
    this.signupRequestPayload.username = this.signupForm.get("username")?.value;
    this.signupRequestPayload.password = this.signupForm.get("password")?.value;

    this.authService.signup(this.signupRequestPayload).subscribe({
      next: () => {
        this.router.navigate(["/login"], { queryParams: { registered: "true" } });
        this.toastr.success("Signup successful");
      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Registration failed! Please try again");
      },
    });
  }
}
