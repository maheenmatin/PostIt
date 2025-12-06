package com.redditclone.postit.services;

import com.redditclone.postit.dto.PostRequest;
import com.redditclone.postit.dto.PostResponse;
import com.redditclone.postit.exceptions.PostItException.PostNotFoundException;
import com.redditclone.postit.exceptions.PostItException.CommunityNotFoundException;
import com.redditclone.postit.mappers.PostMapper;
import com.redditclone.postit.models.Community;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.User;
import com.redditclone.postit.repositories.PostRepository;
import com.redditclone.postit.repositories.CommunityRepository;
import com.redditclone.postit.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PostMapper postMapper;

    public void savePost(PostRequest postRequest) {
        Community community = communityRepository.findByName(postRequest.getCommunityName())
                .orElseThrow(() -> new CommunityNotFoundException(postRequest.getCommunityName()));
        postRepository.save(postMapper.maptoPost(postRequest, community, authService.getCurrentUser()));
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id.toString()));
        return postMapper.mapToDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByCommunity(Long communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new CommunityNotFoundException(communityId.toString()));
        List<Post> posts = postRepository.findAllByCommunity(community);
        return posts.stream().map(postMapper::mapToDto).collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return postRepository.findByUser(user)
                .stream()
                .map(postMapper::mapToDto)
                .collect(toList());
    }
}
