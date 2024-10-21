import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, switchMap, take, filter } from "rxjs/operators";
import { AuthService } from "./auth/shared/auth.service";
import { inject } from "@angular/core";
import { LoginResponse } from "./auth/login/login-response.payload";

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const authService = inject(AuthService);
  const isTokenRefreshing = new BehaviorSubject<boolean>(false);
  const refreshTokenSubject = new BehaviorSubject<any>(null);

  if (req.url.indexOf("refresh") !== -1 || req.url.indexOf("login") !== -1) {
    return next(req);
  }

  const jwtToken = authService.getJwtToken();

  if (jwtToken) {
    return next(addToken(req, jwtToken)).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return handleAuthErrors(req, next, authService, isTokenRefreshing, refreshTokenSubject);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  return next(req);
};

function handleAuthErrors(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  isTokenRefreshing: BehaviorSubject<boolean>,
  refreshTokenSubject: BehaviorSubject<any>
): Observable<any> {
  if (!isTokenRefreshing.value) {
    isTokenRefreshing.next(true);
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((refreshTokenResponse: LoginResponse) => {
        isTokenRefreshing.next(false);
        refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
        return next(addToken(req, refreshTokenResponse.authenticationToken));
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((result) => result !== null),
      take(1),
      switchMap((res) => next(addToken(req, authService.getJwtToken())))
    );
  }
}

function addToken(req: HttpRequest<any>, jwtToken: string) {
  return req.clone({
    headers: req.headers.set("Authorization", "Bearer " + jwtToken),
  });
}
