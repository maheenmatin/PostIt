package com.redditclone.postit.services;

import com.redditclone.postit.dto.PostRequest;
import com.redditclone.postit.exceptions.PostItException.CommunityNotFoundException;
import com.redditclone.postit.mappers.PostMapper;
import com.redditclone.postit.models.Community;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.CommunityRepository;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommunityRepository communityRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthService authService;

    @Mock
    private PostMapper postMapper;

    @InjectMocks
    private PostService postService;

    @Test
    void savePost_happyPath_savesPostWithCommunityAndUser() {
        PostRequest request = new PostRequest();
        request.setCommunityName("java");
        request.setPostName("Hello");
        request.setUrl("https://example.com");
        request.setDescription("Desc");

        Community community = new Community();
        community.setCommunityId(1L);
        community.setName("java");

        User currentUser = new User();
        currentUser.setUsername("matt");

        Post mappedPost = new Post();
        mappedPost.setPostName("Hello");
        mappedPost.setCommunity(community);
        mappedPost.setUser(currentUser);

        when(communityRepository.findByName("java")).thenReturn(Optional.of(community));
        when(authService.getCurrentUser()).thenReturn(currentUser);
        when(postMapper.maptoPost(request, community, currentUser)).thenReturn(mappedPost);
        when(postRepository.save(mappedPost)).thenReturn(mappedPost);

        postService.savePost(request);

        // verify mapping call
        verify(postMapper).maptoPost(request, community, currentUser);

        // verify save() called with mappedPost
        ArgumentCaptor<Post> postCaptor = ArgumentCaptor.forClass(Post.class);
        verify(postRepository).save(postCaptor.capture());
        Post saved = postCaptor.getValue();

        // basic sanity check on saved entity
        assert saved.getCommunity() == community;
        assert saved.getUser() == currentUser;
    }

    @Test
    void savePost_communityNotFound_throwsCommunityNotFoundException() {
        PostRequest request = new PostRequest();
        request.setCommunityName("missing");

        when(communityRepository.findByName("missing")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> postService.savePost(request))
                .isInstanceOf(CommunityNotFoundException.class);

        verify(postMapper, never()).maptoPost(any(), any(), any());
        verify(postRepository, never()).save(any());
    }
}
