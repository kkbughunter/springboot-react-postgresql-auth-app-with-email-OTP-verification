package com.example.demo.modules.companies;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Companies, Long> {
  
}
