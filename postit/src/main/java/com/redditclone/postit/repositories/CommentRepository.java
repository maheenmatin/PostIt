package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Comment;
import com.redditclone.postit.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
