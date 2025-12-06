package com.redditclone.postit.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(nullable = false)
    private String postName;

    private String url;

    @Lob
    private String description;

    private Integer voteCount = 0;

    @Column(nullable = false)
    private Instant createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", referencedColumnName = "communityId", nullable = false)
    private Community community;
}
