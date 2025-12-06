package com.redditclone.postit.exceptions.PostItException;

public class CommunityNotFoundException extends RuntimeException {
    public CommunityNotFoundException(String message) {
        super(message);
    }
}
