package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
}
