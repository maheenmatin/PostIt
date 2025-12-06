package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Community;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCommunity(Community community);
    List<Post> findByUser(User user);
}
