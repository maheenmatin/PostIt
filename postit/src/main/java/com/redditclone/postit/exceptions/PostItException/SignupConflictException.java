package com.redditclone.postit.exceptions.PostItException;

import java.util.List;

public class SignupConflictException extends RuntimeException {
    private final List<String> errors;

    public SignupConflictException(List<String> errors) {
        super("Signup conflict");
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}
