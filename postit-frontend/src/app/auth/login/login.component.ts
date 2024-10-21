import { Component } from "@angular/core";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { LoginRequestPayload } from "./login-request.payload";
import { AuthService } from "../shared/auth.service";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string = "";
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: "",
      password: "",
    };
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params["registered"] !== undefined && params["registered"] === "true") {
        this.toastr.success("Signup successful");
        this.registerSuccessMessage =
          "An activation email has been sent - " + " please activate your account before you login!";
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get("username")?.value;
    this.loginRequestPayload.password = this.loginForm.get("password")?.value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigateByUrl("").then(() => window.location.reload());
        this.toastr.success("Login successful");
      },
      () => {
        this.isError = true;
        throwError(() => new Error("test"));
      }
    );
  }
}
