package com.redditclone.postit.services;

import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.models.RefreshToken;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.RefreshTokenRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RefreshTokenServiceTest {

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @InjectMocks
    private RefreshTokenService refreshTokenService;

    @Test
    void generateRefreshToken_persistsTokenForUser() {
        User user = new User();
        user.setUsername("matt");

        when(refreshTokenRepository.existsByToken(anyString())).thenReturn(false);
        when(refreshTokenRepository.save(any(RefreshToken.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        RefreshToken token = refreshTokenService.generateRefreshToken(user);

        assertThat(token.getToken()).isNotBlank();
        assertThat(token.getUser()).isEqualTo(user);
        assertThat(token.getCreatedDate()).isNotNull();

        ArgumentCaptor<RefreshToken> captor = ArgumentCaptor.forClass(RefreshToken.class);
        verify(refreshTokenRepository).save(captor.capture());
        assertThat(captor.getValue().getUser()).isEqualTo(user);
    }

    @Test
    void getUserForRefreshToken_returnsUserWhenTokenExists() {
        User user = new User();
        user.setUsername("matt");

        RefreshToken rt = new RefreshToken();
        rt.setUser(user);

        when(refreshTokenRepository.findByToken("token")).thenReturn(Optional.of(rt));

        User result = refreshTokenService.getUserForRefreshToken("token");

        assertThat(result).isEqualTo(user);
    }

    @Test
    void getUserForRefreshToken_throwsWhenTokenMissing() {
        when(refreshTokenRepository.findByToken("missing")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> refreshTokenService.getUserForRefreshToken("missing"))
                .isInstanceOf(PostItException.class)
                .hasMessageContaining("Invalid refresh token");
    }
}
