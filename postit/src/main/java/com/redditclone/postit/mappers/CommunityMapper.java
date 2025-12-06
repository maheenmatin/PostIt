package com.redditclone.postit.mappers;

import com.redditclone.postit.dto.CommunityDto;
import com.redditclone.postit.models.Post;
import com.redditclone.postit.models.Community;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

    @Mapping(target = "numberOfPosts", expression = "java(mapPosts(community.getPosts()))")
    CommunityDto mapCommunityToDto(Community community);

    default Integer mapPosts(List<Post> numberOfPosts) {
        return numberOfPosts.size();
    }

    @InheritInverseConfiguration
    @Mapping(target = "communityId", ignore = true)
    @Mapping(target = "posts", ignore = true)
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    Community mapDtoToCommunity(CommunityDto communityDto);
}
