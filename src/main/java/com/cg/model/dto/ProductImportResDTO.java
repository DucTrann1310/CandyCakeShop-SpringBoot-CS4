package com.cg.model.dto;

import java.sql.Date;

public interface ProductImportResDTO {

    Long getId();

    Date getImportDate();

    String getProducts();

    Boolean getConrirm();

}
