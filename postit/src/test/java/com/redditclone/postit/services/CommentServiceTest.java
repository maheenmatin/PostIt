package com.redditclone.postit.services;

import com.redditclone.postit.dto.CommentsDto;
import com.redditclone.postit.exceptions.PostItException.PostNotFoundException;
import com.redditclone.postit.mappers.CommentMapper;
import com.redditclone.postit.models.Comment;
import com.redditclone.postit.models.NotificationEmail;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.CommentRepository;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthService authService;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private MailContentBuilder mailContentBuilder;

    @Mock
    private MailService mailService;

    @InjectMocks
    private CommentService commentService;

    @Test
    void save_happyPath_savesCommentAndSendsNotification() {
        Long postId = 1L;

        CommentsDto dto = new CommentsDto();
        dto.setPostId(postId);
        dto.setText("Nice post");

        User postOwner = new User();
        postOwner.setUsername("owner");
        postOwner.setEmail("owner@example.com");

        Post post = new Post();
        post.setPostId(postId);
        post.setUser(postOwner);

        User currentUser = new User();
        currentUser.setUsername("commenter");

        Comment mappedComment = new Comment();
        mappedComment.setText("Nice post");
        mappedComment.setPost(post);
        mappedComment.setUser(currentUser);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(authService.getCurrentUser()).thenReturn(currentUser);
        when(commentMapper.mapToComment(dto, post, currentUser)).thenReturn(mappedComment);

        // let MailContentBuilder return some rendered string
        when(mailContentBuilder.build(anyString())).thenReturn("rendered-message");

        commentService.save(dto);

        // comment was saved
        verify(commentRepository).save(mappedComment);

        // mail content was built from correct base message
        ArgumentCaptor<String> messageCaptor = ArgumentCaptor.forClass(String.class);
        verify(mailContentBuilder).build(messageCaptor.capture());
        String baseMessage = messageCaptor.getValue();
        assertThat(baseMessage).isEqualTo("owner commented on your post.");

        // mail was sent to post owner with rendered body
        ArgumentCaptor<NotificationEmail> emailCaptor = ArgumentCaptor.forClass(NotificationEmail.class);
        verify(mailService).sendMail(emailCaptor.capture());
        NotificationEmail email = emailCaptor.getValue();

        assertThat(email.getRecipient()).isEqualTo("owner@example.com");
        assertThat(email.getSubject()).isEqualTo("owner commented on your post");
        assertThat(email.getBody()).isEqualTo("rendered-message");
    }

    @Test
    void save_postNotFound_throwsPostNotFoundException() {
        Long postId = 99L;

        CommentsDto dto = new CommentsDto();
        dto.setPostId(postId);
        dto.setText("Nice");

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> commentService.save(dto))
                .isInstanceOf(PostNotFoundException.class);

        verify(commentRepository, never()).save(any());
        verify(mailService, never()).sendMail(any());
    }

    @Test
    void getAllCommentsForUser_userNotFound_throwsUsernameNotFoundException() {
        String userName = "missing";

        when(userRepository.findByUsername(userName)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> commentService.getAllCommentsForUser(userName))
                .isInstanceOf(UsernameNotFoundException.class);

        verify(commentRepository, never()).findAllByUser(any());
    }

    @Test
    void getAllCommentsForPost_happyPath_mapsToDto() {
        Long postId = 1L;

        Post post = new Post();
        post.setPostId(postId);

        Comment comment = new Comment();
        comment.setPost(post);

        CommentsDto dto = new CommentsDto();
        dto.setPostId(postId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(commentRepository.findByPost(post)).thenReturn(List.of(comment));
        when(commentMapper.mapToDto(comment)).thenReturn(dto);

        List<CommentsDto> result = commentService.getAllCommentsForPost(postId);

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getPostId()).isEqualTo(postId);
    }
}
