import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SignupRequestPayload } from "../signup/signup-request.payload";
import { map, Observable, tap } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";
import { LoginRequestPayload } from "../login/login-request.payload";
import { LoginResponse } from "../login/login-response.payload";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signupRequestPayload, {
      responseType: "text",
    });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>("http://localhost:8080/api/auth/login", loginRequestPayload).pipe(
      map((data) => {
        this.localStorage.store("authenticationToken", data.authenticationToken);
        this.localStorage.store("username", data.username);
        this.localStorage.store("refreshToken", data.refreshToken);
        this.localStorage.store("expiresAt", data.expiresAt);

        return true;
      })
    );
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>("http://localhost:8080/api/auth/refresh/token", this.createRefreshTokenPayload())
      .pipe(
        tap((response) => {
          this.localStorage.clear("authenticationToken");
          this.localStorage.clear("expiresAt");

          this.localStorage.store("authenticationToken", response.authenticationToken);
          this.localStorage.store("expiresAt", response.expiresAt);
        })
      );
  }

  createRefreshTokenPayload(): any {
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
