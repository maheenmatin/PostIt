package com.redditclone.postit.exceptions;

import com.redditclone.postit.exceptions.PostItException.SignupConflictException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(SignupConflictException.class)
    public ResponseEntity<Map<String, Object>> handleSignupConflict(SignupConflictException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "errors", exception.getErrors(),
                        "errorCodes", exception.getErrorCodes()
                ));
    }
}
