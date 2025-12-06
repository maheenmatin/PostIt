package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByName(String communityName);
}
