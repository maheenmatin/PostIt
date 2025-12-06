package com.redditclone.postit.services;

import com.redditclone.postit.models.User;
import com.redditclone.postit.models.VerificationToken;
import com.redditclone.postit.repositories.VerificationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class VerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;

    public String generateVerificationToken(User user) {
        String token;

        do {
            token = UUID.randomUUID().toString();
        } while (verificationTokenRepository.existsByToken(token));

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setCreatedDate(Instant.now());
        verificationToken.setUser(user); // link token to user
        verificationTokenRepository.save(verificationToken); // save token in database

        return token;
    }

    public Optional<VerificationToken> getVerificationTokenEntity(String token) {
        return verificationTokenRepository.findByToken(token);
    }
}
