package com.redditclone.postit.controllers;

import com.redditclone.postit.dto.AuthenticationResponse;
import com.redditclone.postit.dto.LoginRequest;
import com.redditclone.postit.dto.RefreshTokenRequest;
import com.redditclone.postit.dto.RegisterRequest;
import com.redditclone.postit.services.AuthService;
import com.redditclone.postit.services.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest) {
        authService.signup(registerRequest);
        return new ResponseEntity<>("User registration successful", OK);
    }

    @GetMapping(value = "accountVerification/{token}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        try {
            authService.verifyAccount(token);
            return ResponseEntity.ok(buildAccountVerificationPage(
                    "Account confirmed",
                    "Your account has been verified. You can now log in to PostIt.",
                    true
            ));
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(buildAccountVerificationPage(
                    "Verification failed",
                    "We couldn't verify your account. The link may be invalid or expired.",
                    false
            ));
        }
    }

    private String buildAccountVerificationPage(String title, String message, boolean success) {
        String statusClass = success ? "status-pill success" : "status-pill error";
        String statusLabel = success ? "Confirmed" : "Action required";

        return """
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>PostIt | Account Confirmation</title>
                <style>
                  body {
                    margin: 0;
                    font-family: "Helvetica Neue", Arial, sans-serif;
                    background: #f4f6fb;
                    color: #1f2330;
                  }
                  .wrapper {
                    max-width: 560px;
                    margin: 80px auto;
                    padding: 0 16px;
                  }
                  .card {
                    background: #ffffff;
                    border-radius: 14px;
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.1);
                    padding: 28px;
                  }
                  h1 {
                    font-size: 22px;
                    margin: 0 0 8px;
                    color: #111827;
                  }
                  p {
                    margin: 0 0 20px;
                    color: #6b7280;
                    font-size: 14px;
                  }
                  .status-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 12px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.4px;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                  }
                  .status-pill.success {
                    background: #dcfce7;
                    color: #15803d;
                  }
                  .status-pill.error {
                    background: #fee2e2;
                    color: #b91c1c;
                  }
                  .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px 18px;
                    border-radius: 999px;
                    background: #0079d3;
                    color: #ffffff;
                    font-size: 12px;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                  }
                </style>
              </head>
              <body>
                <div class="wrapper">
                  <div class="card">
                    <div class="%s">%s</div>
                    <h1>%s</h1>
                    <p>%s</p>
                    <a class="btn" href="http://localhost:4200/login">Go to login</a>
                  </div>
                </div>
              </body>
            </html>
            """.formatted(statusClass, statusLabel, title, message);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/refresh/token")
    public AuthenticationResponse refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return ResponseEntity.status(OK).body("Refresh token deleted successfully");
    }
}
