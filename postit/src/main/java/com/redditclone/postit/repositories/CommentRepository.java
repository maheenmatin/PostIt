package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Comment;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    List<Comment> findAllByUser(User user);
}
