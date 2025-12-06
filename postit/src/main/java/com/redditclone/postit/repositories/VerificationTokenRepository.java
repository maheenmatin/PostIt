package com.redditclone.postit.repositories;

import com.redditclone.postit.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    // create SQL query using token, then execute on database
    Optional<VerificationToken> findByToken(String token);
    boolean existsByToken(String token);
}
