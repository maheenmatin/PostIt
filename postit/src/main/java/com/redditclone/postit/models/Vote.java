package com.redditclone.postit.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long voteId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private VoteType voteType;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id", referencedColumnName = "postId")
    private Post post;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;
}
