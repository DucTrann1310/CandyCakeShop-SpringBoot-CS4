package com.cg.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImportProductCreReqDTO {

    private String importDate;

    private List<ProductImportCreReqDTO> products;

    @Override
    public String toString() {
        return "ImportProductReqDTO{" +
                "importDate=" + importDate +
                ", products=" + products.toString() +
                '}';
    }


}
