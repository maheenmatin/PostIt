package com.redditclone.postit.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.List;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Community {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long communityId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String description;

    @OneToMany(mappedBy = "community", fetch = LAZY)
    private List<Post> posts;

    @Column(nullable = false)
    private Instant createdDate;

    @ManyToOne(fetch = LAZY)
    private User user;
}
