package com.example.demo.modules.user.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.modules.companies.Companies;
import com.example.demo.modules.usercompmap.UserCompanyMap;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserDto {
  
    private Long userId;

    private String firstName;

    private String lastName;

    private String userName;

    private String password;

    private String contactNo;

    private String email;
    
    private Companies defaultCompany;
    
    private Boolean isActive;

    private String createdBy;

    private LocalDateTime createdDt;

    private String modifiedBy;

    private LocalDateTime modifiedDt;

    private List<UserCompanyMap> companyMapping;
}
