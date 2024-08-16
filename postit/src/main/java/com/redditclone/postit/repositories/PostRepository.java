package com.redditclone.postit.repositories;

import com.redditclone.postit.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
