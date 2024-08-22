package com.redditclone.postit.exceptions.PostItException;

public class PostItException extends RuntimeException {
    public PostItException(String message, Exception exception) {
        super(message, exception);
    }

    public PostItException(String message) {
        super(message);
    }
}
