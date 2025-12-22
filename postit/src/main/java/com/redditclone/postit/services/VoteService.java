package com.redditclone.postit.services;

import com.redditclone.postit.dto.VoteDto;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.exceptions.PostItException.PostNotFoundException;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.Vote;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import static com.redditclone.postit.models.VoteType.DOWNVOTE;
import static com.redditclone.postit.models.VoteType.UPVOTE;

@Service
@AllArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final AuthService authService;

    @Transactional
    public void vote(VoteDto voteDto) {
        Post post = postRepository.findById(voteDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post not found with ID - " + voteDto.getPostId()));
        Optional<Vote> voteByPostAndUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(
                post, authService.getCurrentUser());

        if (voteByPostAndUser.isPresent() && voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())) {
            throw new PostItException("You have already "
                    + voteDto.getVoteType() + "D this post");
        }
        int voteDelta;
        if (voteByPostAndUser.isPresent()) {
            Vote previousVote = voteByPostAndUser.get();
            if (UPVOTE.equals(previousVote.getVoteType()) && DOWNVOTE.equals(voteDto.getVoteType())) {
                voteDelta = -2;
            } else if (DOWNVOTE.equals(previousVote.getVoteType()) && UPVOTE.equals(voteDto.getVoteType())) {
                voteDelta = 2;
            } else if (UPVOTE.equals(voteDto.getVoteType())) {
                voteDelta = 1;
            } else {
                voteDelta = -1;
            }
        } else if (UPVOTE.equals(voteDto.getVoteType())) {
            voteDelta = 1;
        } else {
            voteDelta = -1;
        }
        post.setVoteCount(post.getVoteCount() + voteDelta);
        voteRepository.save(mapToVote(voteDto, post));
        postRepository.save(post);
    }

    private Vote mapToVote(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}
