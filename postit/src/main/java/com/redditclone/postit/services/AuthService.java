package com.redditclone.postit.services;

import com.redditclone.postit.dto.AuthenticationResponse;
import com.redditclone.postit.dto.LoginRequest;
import com.redditclone.postit.dto.RefreshTokenRequest;
import com.redditclone.postit.dto.RegisterRequest;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.exceptions.PostItException.SignupConflictException;
import com.redditclone.postit.models.NotificationEmail;
import com.redditclone.postit.models.User;
import com.redditclone.postit.models.VerificationToken;
import com.redditclone.postit.repositories.UserRepository;
import com.redditclone.postit.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerificationTokenService verificationTokenService;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    public void signup(RegisterRequest registerRequest) {
        List<String> conflicts = new ArrayList<>();
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            conflicts.add("Username already exists.");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            conflicts.add("Email already exists.");
        }
        if (!conflicts.isEmpty()) {
            throw new SignupConflictException(conflicts);
        }

        // save user information in database
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreatedDate(Instant.now());
        user.setEnabled(false);
        userRepository.save(user);

        // send email with verification token
        String token = verificationTokenService.generateVerificationToken(user);
        mailService.sendMail(new NotificationEmail("Activate your PostIt account",
                user.getEmail(), "Thank you for signing up to PostIt. " +
                "Please click on the following link to activate your account: " +
                "http://localhost:8080/api/auth/accountVerification/" + token));
    }

    @Transactional
    public void verifyAccount(String token) {
        VerificationToken verificationToken = verificationTokenService.getVerificationTokenEntity(token)
                .orElseThrow(() -> new PostItException("Invalid token")); // throw if null
        fetchUserAndEnable(verificationToken);
    }

    public void fetchUserAndEnable(VerificationToken verificationToken) {
        String username = verificationToken.getUser().getUsername(); // use getter methods from models package
        User user = userRepository.findByUsername(username).orElseThrow(() -> new PostItException(
                "Unable to find user with username " + username));

        // set enabled to true, then save this change in the database (User table)
        user.setEnabled(true);
        userRepository.save(user);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        // fetch user based on username, then compare provided password with password in database
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));

        String username = loginRequest.getUsername();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new PostItException(
                "Unable to find user with username " + username));

        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = jwtProvider.generateToken(authenticate);

        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken(user).getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(loginRequest.getUsername())
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        User user = refreshTokenService.getUserForRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUserName(user.getUsername());

        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(user.getUsername())
                .build();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        Jwt principal = (Jwt) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(principal.getSubject())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + principal.getSubject()));
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }
}
