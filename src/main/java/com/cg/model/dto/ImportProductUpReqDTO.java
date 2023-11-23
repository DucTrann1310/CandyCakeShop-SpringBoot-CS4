package com.cg.model.dto;

import com.cg.model.ProductImport;
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
public class ImportProductUpReqDTO {

    private String importDate;

    private List<ProductImportUpReqDTO> products;


    @Override
    public String toString() {
        return "ImportProductReqDTO{" +
                "importDate=" + importDate +
                ", products=" + products.toString() +
                '}';
    }
}
