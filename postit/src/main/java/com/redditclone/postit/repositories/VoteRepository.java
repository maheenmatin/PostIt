package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc(Post post, User currentUser);
}
