import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { SignupRequestPayload } from "../signup/signup-request.payload";
import { LoginRequestPayload } from "../login/login-request.payload";
import { LoginResponse } from "../login/login-response.payload";
import { API_ENDPOINTS } from "../../shared/api.constants";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private router: Router) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<string> {
    return this.httpClient.post(`${API_ENDPOINTS.auth}/signup`, signupRequestPayload, {
      responseType: "text",
    });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${API_ENDPOINTS.auth}/login`, loginRequestPayload).pipe(
      map((data) => {
        this.localStorage.store("authenticationToken", data.authenticationToken);
        this.localStorage.store("username", data.username);
        this.localStorage.store("refreshToken", data.refreshToken);
        this.localStorage.store("expiresAt", data.expiresAt);

        this.localStorage.store("loggedIn", "true");
        this.loggedIn.emit(true);
        return true;
      })
    );
  }

  logout() {
    this.httpClient
      .post(`${API_ENDPOINTS.auth}/logout`, this.createRefreshTokenPayload(), { responseType: "text" })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error("Logout failed", error);
        },
      });
    this.localStorage.clear("authenticationToken");
    this.localStorage.clear("username");
    this.localStorage.clear("refreshToken");
    this.localStorage.clear("expiresAt");

    this.localStorage.store("loggedIn", "false");
    this.loggedIn.emit(false);

    this.router.navigateByUrl("").then(() => window.location.reload());
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(`${API_ENDPOINTS.auth}/refresh/token`, this.createRefreshTokenPayload())
      .pipe(
        tap((response) => {
          this.localStorage.clear("authenticationToken");
          this.localStorage.clear("expiresAt");

          this.localStorage.store("authenticationToken", response.authenticationToken);
          this.localStorage.store("expiresAt", response.expiresAt);
        })
      );
  }

  createRefreshTokenPayload(): { refreshToken: string; username: string } {
    return {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName(),
    };
  }

  getJwtToken() {
    return this.localStorage.retrieve("authenticationToken");
  }

  getUserName() {
    return this.localStorage.retrieve("username");
  }

  getRefreshToken() {
    return this.localStorage.retrieve("refreshToken");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
