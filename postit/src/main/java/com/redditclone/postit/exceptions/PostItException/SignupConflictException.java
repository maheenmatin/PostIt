package com.redditclone.postit.exceptions.PostItException;

import java.util.List;

public class SignupConflictException extends RuntimeException {
    private final List<String> errorCodes;
    private final List<String> errors;

    public SignupConflictException(List<String> errorCodes, List<String> errors) {
        super("Signup conflict");
        this.errorCodes = errorCodes;
        this.errors = errors;
    }

    public List<String> getErrorCodes() {
        return errorCodes;
    }

    public List<String> getErrors() {
        return errors;
    }
}
