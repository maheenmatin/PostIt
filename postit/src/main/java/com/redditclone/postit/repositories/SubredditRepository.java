package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Subreddit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubredditRepository extends JpaRepository<Subreddit, Long> {
}
