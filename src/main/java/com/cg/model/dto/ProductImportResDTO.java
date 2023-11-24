package com.cg.model.dto;

import java.sql.Date;
import java.time.LocalDateTime;

public interface ProductImportResDTO {

    Long getId();

    Date getImportDate();

    String getProducts();

    Boolean getConfirm();

}
