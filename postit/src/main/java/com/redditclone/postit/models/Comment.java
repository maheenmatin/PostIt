package com.redditclone.postit.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Comment {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private Long commentId;

    @Column(nullable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY) // fetch only when needed
    @JoinColumn(name = "post_id", referencedColumnName = "postId", nullable = false) // foreign key
    private Post post;

    @Column(nullable = false)
    private Instant createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;
}
