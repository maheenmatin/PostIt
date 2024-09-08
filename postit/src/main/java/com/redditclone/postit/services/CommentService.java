package com.redditclone.postit.services;

import com.redditclone.postit.dto.CommentsDto;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.exceptions.PostItException.PostNotFoundException;
import com.redditclone.postit.mappers.CommentMapper;
import com.redditclone.postit.models.Comment;
import com.redditclone.postit.models.NotificationEmail;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.CommentRepository;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private static final String POST_URL = "";
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public void save(CommentsDto commentsDto) {
        Post post = postRepository.findById(commentsDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(commentsDto.getPostId().toString()));
        Comment comment = commentMapper.map(commentsDto, post, authService.getCurrentUser());
        commentRepository.save(comment);

        String message = mailContentBuilder.build(
                post.getUser().getUsername() + " commented on your post." + POST_URL);
        sendCommentNotification(message, post.getUser());
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(
                user.getUsername() + " commented on your post", user.getEmail(), message));
    }

    public List<CommentsDto> getAllCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId.toString()));
        return commentRepository.findByPost(post)
                .stream()
                .map(commentMapper::mapToDto).toList();
    }

    public List<CommentsDto> getAllCommentsForUser(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));
        return commentRepository.findAllByUser(user)
                .stream()
                .map(commentMapper::mapToDto)
                .toList();
    }

    public boolean containsSwearWords(String comment) {
        /*
        if (comment.contains("xyz")) {
            throw new PostItException("Comment contains unacceptable language");
        }
         */
        return false;
    }
}
