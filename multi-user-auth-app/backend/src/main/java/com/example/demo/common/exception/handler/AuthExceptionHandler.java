package com.example.demo.common.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.common.exception.InvalidCredentialsException;
import com.example.demo.common.exception.UserNotActiveException;
import com.example.demo.common.util.ApiResponse;
import com.example.demo.common.util.ApiResponseFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidCredentials(InvalidCredentialsException ex) {
        log.warn("Auth error: {}", ex.getMessage());
        return ResponseEntity.status(400).body(ApiResponseFactory.error(ex.getMessage(), 400));
    }

    @ExceptionHandler(UserNotActiveException.class)
    public ResponseEntity<ApiResponse<?>> handleUserNotActive(UserNotActiveException ex) {
        log.warn("User not active: {}", ex.getMessage());
        return ResponseEntity.status(403).body(ApiResponseFactory.error(ex.getMessage(), 403));
    }
}
