package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Subreddit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubredditRepository extends JpaRepository<Subreddit, Long> {
    Optional<Subreddit> findByName(String subredditName);
}
