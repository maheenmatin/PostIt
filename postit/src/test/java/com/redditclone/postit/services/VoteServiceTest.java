package com.redditclone.postit.services;

import com.redditclone.postit.dto.VoteDto;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.exceptions.PostItException.PostNotFoundException;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.models.Vote;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.VoteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static com.redditclone.postit.models.VoteType.DOWNVOTE;
import static com.redditclone.postit.models.VoteType.UPVOTE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VoteServiceTest {

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private VoteService voteService;

    @Test
    void vote_upvoteFirstTime_incrementsVoteCountAndSaves() {
        Long postId = 1L;

        Post post = new Post();
        post.setPostId(postId);
        post.setVoteCount(0);

        User currentUser = new User();
        currentUser.setUsername("matt");

        VoteDto voteDto = new VoteDto();
        voteDto.setPostId(postId);
        voteDto.setVoteType(UPVOTE);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(authService.getCurrentUser()).thenReturn(currentUser);
        when(voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, currentUser))
                .thenReturn(Optional.empty());

        voteService.vote(voteDto);

        assertThat(post.getVoteCount()).isEqualTo(1);

        verify(voteRepository).save(any(Vote.class));
        verify(postRepository).save(post);
    }

    @Test
    void vote_downvoteFirstTime_decrementsVoteCountAndSaves() {
        Long postId = 2L;

        Post post = new Post();
        post.setPostId(postId);
        post.setVoteCount(10);

        User currentUser = new User();
        currentUser.setUsername("matt");

        VoteDto voteDto = new VoteDto();
        voteDto.setPostId(postId);
        voteDto.setVoteType(DOWNVOTE);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(authService.getCurrentUser()).thenReturn(currentUser);
        when(voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, currentUser))
                .thenReturn(Optional.empty());

        voteService.vote(voteDto);

        assertThat(post.getVoteCount()).isEqualTo(9);

        verify(voteRepository).save(any(Vote.class));
        verify(postRepository).save(post);
    }

    @Test
    void vote_sameVoteTwice_throwsExceptionAndDoesNotSave() {
        Long postId = 3L;

        Post post = new Post();
        post.setPostId(postId);
        post.setVoteCount(5);

        User currentUser = new User();
        currentUser.setUsername("matt");

        VoteDto voteDto = new VoteDto();
        voteDto.setPostId(postId);
        voteDto.setVoteType(UPVOTE);

        Vote existingVote = new Vote();
        existingVote.setVoteType(UPVOTE);
        existingVote.setPost(post);
        existingVote.setUser(currentUser);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(authService.getCurrentUser()).thenReturn(currentUser);
        when(voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, currentUser))
                .thenReturn(Optional.of(existingVote));

        assertThatThrownBy(() -> voteService.vote(voteDto))
                .isInstanceOf(PostItException.class)
                .hasMessageContaining("already UPVOTED this post");

        verify(voteRepository, never()).save(any());
        verify(postRepository, never()).save(any());
        assertThat(post.getVoteCount()).isEqualTo(5);
    }

    @Test
    void vote_postNotFound_throwsPostNotFoundException() {
        Long postId = 99L;

        VoteDto voteDto = new VoteDto();
        voteDto.setPostId(postId);
        voteDto.setVoteType(UPVOTE);

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> voteService.vote(voteDto))
                .isInstanceOf(PostNotFoundException.class);

        verify(voteRepository, never()).save(any());
        verify(postRepository, never()).save(any());
    }
}
