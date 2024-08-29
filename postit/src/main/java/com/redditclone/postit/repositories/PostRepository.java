package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.Subreddit;
import com.redditclone.postit.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubreddit(Subreddit subreddit);
    List<Post> findByUser(User user);
}
