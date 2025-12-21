import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, finalize, switchMap, take, filter } from "rxjs/operators";
import { AuthService } from "./auth/shared/auth.service";
import { inject } from "@angular/core";
import { LoginResponse } from "./auth/login/login-response.payload";
import { API_ENDPOINTS } from "./shared/api.constants";

let isTokenRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const authService = inject(AuthService);

  const skipAuthUrls = [
    `${API_ENDPOINTS.auth}/login`,
    `${API_ENDPOINTS.auth}/refresh/token`,
    `${API_ENDPOINTS.auth}/signup`,
    `${API_ENDPOINTS.auth}/logout`,
    `${API_ENDPOINTS.auth}/accountVerification`,
  ];

  if (skipAuthUrls.some((url) => req.url.startsWith(url))) {
    return next(req);
  }

  const jwtToken = authService.getJwtToken();
  const authReq = jwtToken ? addToken(req, jwtToken) : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handleAuthErrors(req, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function handleAuthErrors(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<any> {
  if (!authService.getRefreshToken()) {
    authService.logout();
    return throwError(() => new Error("No refresh token available"));
  }

  if (!isTokenRefreshing) {
    isTokenRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((refreshTokenResponse: LoginResponse) => {
        refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
        return next(addToken(req, refreshTokenResponse.authenticationToken));
      }),
      catchError((error) => {
        authService.logout();
        return throwError(() => error);
      }),
      finalize(() => {
        isTokenRefreshing = false;
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap((token) => next(addToken(req, token)))
  );
}

function addToken(req: HttpRequest<any>, jwtToken: string) {
  return req.clone({
    headers: req.headers.set("Authorization", "Bearer " + jwtToken),
  });
}
