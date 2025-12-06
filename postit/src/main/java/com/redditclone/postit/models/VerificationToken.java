package com.redditclone.postit.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long verificationId;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private Instant createdDate;
}
