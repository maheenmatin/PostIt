import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SignupRequestPayload } from "./signup-request.payload";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(private authService : AuthService) {
    this.signupRequestPayload = {
      username: "",
      email: "",
      password: "",
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get("email")!.value;
    this.signupRequestPayload.username = this.signupForm.get("username")!.value;
    this.signupRequestPayload.password = this.signupForm.get("password")!.value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        console.log(data);
      });
  }
}
