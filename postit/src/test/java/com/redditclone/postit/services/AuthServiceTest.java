package com.redditclone.postit.services;

import com.redditclone.postit.dto.AuthenticationResponse;
import com.redditclone.postit.dto.LoginRequest;
import com.redditclone.postit.dto.RefreshTokenRequest;
import com.redditclone.postit.dto.RegisterRequest;
import com.redditclone.postit.models.NotificationEmail;
import com.redditclone.postit.models.RefreshToken;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.UserRepository;
import com.redditclone.postit.security.JwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    // mock dependencies
    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private VerificationTokenService verificationTokenService;

    @Mock
    private MailService mailService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtProvider jwtProvider;

    @Mock
    private RefreshTokenService refreshTokenService;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        // nothing for now
    }

    @Test
    void signup_savesDisabledUser_andSendsVerificationMail() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("matt");
        request.setEmail("matt@example.com");
        request.setPassword("password");

        // stub method behaviour
        when(passwordEncoder.encode("password")).thenReturn("encoded");
        when(verificationTokenService.generateVerificationToken(any(User.class)))
                .thenReturn("verification-token");

        // call the method under test
        authService.signup(request);

        // verify that .save() was called + extract the User argument
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();

        // verify user saved with correct fields
        assertThat(savedUser.getUsername()).isEqualTo("matt");
        assertThat(savedUser.getEmail()).isEqualTo("matt@example.com");
        assertThat(savedUser.getPassword()).isEqualTo("encoded");
        assertThat(savedUser.isEnabled()).isFalse();
        assertThat(savedUser.getCreatedDate()).isNotNull();

        // verify mail sent
        ArgumentCaptor<NotificationEmail> emailCaptor = ArgumentCaptor.forClass(NotificationEmail.class);
        verify(mailService).sendMail(emailCaptor.capture());
        NotificationEmail email = emailCaptor.getValue();

        assertThat(email.getRecipient()).isEqualTo("matt@example.com");
        assertThat(email.getSubject()).contains("Activate your PostIt account");
        assertThat(email.getBody()).contains("verification-token");
    }

    @Test
    void refreshToken_returnsNewJwtAndSameRefreshToken() {
        RefreshTokenRequest request = new RefreshTokenRequest();
        request.setRefreshToken("refresh-token");
        request.setUsername("ignored-username");

        User user = new User();
        user.setUsername("actualUser");

        when(refreshTokenService.getUserForRefreshToken("refresh-token")).thenReturn(user);
        when(jwtProvider.generateTokenWithUserName("actualUser")).thenReturn("new-jwt-token");
        when(jwtProvider.getJwtExpirationInMillis()).thenReturn(3600000L);

        AuthenticationResponse response = authService.refreshToken(request);

        assertThat(response.getAuthenticationToken()).isEqualTo("new-jwt-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getUsername()).isEqualTo("actualUser");
        assertThat(response.getExpiresAt()).isNotNull();
    }

    @Test
    void login_authenticatesUser_andReturnsTokens() {
        LoginRequest request = new LoginRequest();
        request.setUsername("matt");
        request.setPassword("password");

        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        User user = new User();
        user.setUsername("matt");
        when(userRepository.findByUsername("matt")).thenReturn(Optional.of(user));

        when(jwtProvider.generateToken(authentication)).thenReturn("jwt-token");
        when(jwtProvider.getJwtExpirationInMillis()).thenReturn(3600000L);

        // refresh token
        RefreshToken rt = new RefreshToken();
        rt.setToken("refresh-token");
        when(refreshTokenService.generateRefreshToken(user)).thenReturn(rt);

        AuthenticationResponse response = authService.login(request);

        assertThat(response.getAuthenticationToken()).isEqualTo("jwt-token");
        assertThat(response.getRefreshToken()).isEqualTo("refresh-token");
        assertThat(response.getUsername()).isEqualTo("matt");
        assertThat(response.getExpiresAt()).isNotNull();

        verify(authenticationManager).authenticate(
                argThat(token -> token.getName().equals("matt")));
        verify(userRepository).findByUsername("matt");
    }
}
