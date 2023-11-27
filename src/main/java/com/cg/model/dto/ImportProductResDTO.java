package com.cg.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImportProductResDTO {

    private Long id;

    private Date importDate;

    private Boolean confirm;

    private List<ProductImportDetailResDTO> productImportDetailResDTOS;

    public ImportProductResDTO(Long id, java.util.Date importDate, Boolean confirm){
        this.id = id;
        this.importDate = new Date(importDate.getTime());
        this.confirm = confirm;
    }

}
