package com.cg.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ProductImportListResDTO {

    Long getId();

    String getCode();

    LocalDateTime getCreatedAt();

    String getProducts();

    BigDecimal getTotal();

}
