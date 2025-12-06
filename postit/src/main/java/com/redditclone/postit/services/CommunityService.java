package com.redditclone.postit.services;

import com.redditclone.postit.dto.CommunityDto;
import com.redditclone.postit.exceptions.PostItException.PostItException;
import com.redditclone.postit.mappers.CommunityMapper;
import com.redditclone.postit.models.Community;
import com.redditclone.postit.repositories.CommunityRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityMapper communityMapper;

    @Transactional
    public CommunityDto saveCommunity(CommunityDto communityDto) {
        Community community = communityRepository.save(communityMapper.mapDtoToCommunity(communityDto));
        communityDto.setCommunityId(community.getCommunityId());
        return communityDto;
    }

    @Transactional(readOnly = true)
    public List<CommunityDto> getAll() {
        return communityRepository.findAll()
                .stream()
                .map(communityMapper::mapCommunityToDto)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public CommunityDto getCommunity(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new PostItException("No community found with ID - " + id));
        return communityMapper.mapCommunityToDto(community);
    }
}
