package com.redditclone.postit.exceptions.PostItException;

// exceptions can be common in REST APIs
// we do not want to expose technical information to the user
// use custom exceptions to provide useful/understandable information
public class PostItException extends RuntimeException {
    public PostItException(String message, Exception exception) {
        super(message, exception);
    }

    public PostItException(String message) {
        super(message);
    }
}
