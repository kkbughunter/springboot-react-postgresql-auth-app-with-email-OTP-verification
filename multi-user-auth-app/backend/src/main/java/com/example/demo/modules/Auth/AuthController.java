package com.example.demo.modules.Auth;

import com.example.demo.common.util.ApiResponse;
import com.example.demo.common.util.ApiResponseFactory;
import com.example.demo.modules.Auth.dto.LoginRequest;
import com.example.demo.modules.Auth.dto.LoginResponse;
import com.example.demo.modules.Auth.dto.RegisterRequest;
import com.example.demo.modules.Auth.dto.RegisterResponse;
import com.example.demo.modules.Auth.dto.RefreshTokenRequest;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponseFactory.accepted(response, "Login successful");
    }
    
    @PostMapping("/register")
    public ApiResponse<RegisterResponse> registerNewUser(@Valid @RequestBody RegisterRequest dto) {
        RegisterResponse response = authService.registerNewUser(dto);
        return ApiResponseFactory.created(response, "Register successful");
    }
    
    @PostMapping("/refresh-token")
    public ApiResponse<LoginResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoginResponse response = authService.refreshToken(request.getRefreshToken());
        return ApiResponseFactory.accepted(response, "Token refreshed successfully");
    }
    
}