package com.redditclone.postit.controllers;

import com.redditclone.postit.dto.AuthenticationResponse;
import com.redditclone.postit.dto.LoginRequest;
import com.redditclone.postit.dto.RefreshTokenRequest;
import com.redditclone.postit.dto.RegisterRequest;
import com.redditclone.postit.services.AuthService;
import com.redditclone.postit.services.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody RegisterRequest registerRequest) {
        authService.signup(registerRequest);
        return ResponseEntity.ok(Map.of("message", "User registration successful"));
    }

    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);
        String html = """
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Account Confirmed</title>
                <style>
                  :root {
                    color-scheme: light;
                  }
                  body {
                    margin: 0;
                    font-family: "Inter", "Segoe UI", system-ui, sans-serif;
                    background: #f4f6fb;
                    color: #1f2330;
                  }
                  .page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 16px;
                  }
                  .card {
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.1);
                    padding: 32px 36px;
                    max-width: 520px;
                    text-align: center;
                    border: 1px solid #e4e7ef;
                  }
                  .badge {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #e8f1fb;
                    color: #0079d3;
                    font-size: 28px;
                    margin-bottom: 16px;
                  }
                  h1 {
                    font-size: 24px;
                    margin: 0 0 8px;
                    font-weight: 600;
                  }
                  p {
                    margin: 0;
                    color: #5a6478;
                    font-size: 15px;
                    line-height: 1.5;
                  }
                </style>
              </head>
              <body>
                <div class="page">
                  <div class="card">
                    <div class="badge">✓</div>
                    <h1>Account confirmed</h1>
                    <p>Your email has been verified. You can return to PostIt and log in.</p>
                  </div>
                </div>
              </body>
            </html>
            """;
        return ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(html);
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
