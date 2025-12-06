package com.redditclone.postit.services;

import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.models.RefreshToken;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.RefreshTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken generateRefreshToken(User user) {
        String token;

        do {
            token = UUID.randomUUID().toString();
        } while (refreshTokenRepository.existsByToken(token));

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setCreatedDate(Instant.now());
        refreshToken.setUser(user);

        return refreshTokenRepository.save(refreshToken);
    }

    public User getUserForRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new PostItException("Invalid refresh token"));
        return refreshToken.getUser();
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
