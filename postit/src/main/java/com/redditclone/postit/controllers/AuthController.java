package com.redditclone.postit.controllers;

import com.redditclone.postit.dto.RegisterRequest;
import com.redditclone.postit.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService; // constructor injection via @AllArgsConstructor and @RestController

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest registerRequest) { // deserialize JSON to object
        authService.signup(registerRequest);
        return new ResponseEntity<>("User registration successful", HttpStatus.OK); // @ResponseBody is added
        // by @RestController annotation
    }

    @GetMapping("accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);
        return new ResponseEntity<>("Account activated successfully", HttpStatus.OK);
    }
}
