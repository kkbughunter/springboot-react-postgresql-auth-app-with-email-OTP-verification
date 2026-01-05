package com.example.demo.modules.otp;

import com.example.demo.common.util.ApiResponse;
import com.example.demo.common.util.ApiResponseFactory;
import com.example.demo.modules.otp.dto.SendOtpRequest;
import com.example.demo.modules.otp.dto.VerifyOtpRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send-otp")
    public ApiResponse<String> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        try {
            otpService.sendOtp(request.getEmail());
            return ApiResponseFactory.accepted("OTP sent successfully", "OTP sent to " + request.getEmail());
        } catch (RuntimeException e) {
            if (e.getMessage().equals("User already verified")) {
                return ApiResponseFactory.badRequest("User already verified");
            }
            throw e;
        }
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        boolean isVerified = otpService.verifyOtp(request.getEmail(), request.getOtp());
        
        if (isVerified) {
            return ApiResponseFactory.accepted("Email verified successfully", "User verified");
        } else {
            return ApiResponseFactory.badRequest("Invalid or expired OTP");
        }
    }
}