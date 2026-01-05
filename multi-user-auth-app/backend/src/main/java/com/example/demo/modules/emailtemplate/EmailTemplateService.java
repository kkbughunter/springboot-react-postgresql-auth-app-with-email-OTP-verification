package com.example.demo.modules.emailtemplate;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.modules.emailtemplate.dto.EmailTemplateDetails;

@Service
public class EmailTemplateService {

    private final EmailTemplateRepository emailTemplateRepository;

    EmailTemplateService(EmailTemplateRepository emailTemplateRepository) {
        this.emailTemplateRepository = emailTemplateRepository;
    }
  
  public EmailTemplateDetails getEmailTemplateByName(String name){
    Optional<EmailTemplateDetails> detailsOpt = emailTemplateRepository.findTemplateDetailByName(name);
    EmailTemplateDetails details = detailsOpt.orElseThrow(() -> new RuntimeException("Template not found for the given Name"));
    return details;
  }
}
