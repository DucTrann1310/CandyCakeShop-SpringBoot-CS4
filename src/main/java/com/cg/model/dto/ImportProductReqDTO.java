package com.cg.model.dto;

import com.cg.model.ProductImport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ImportProductReqDTO {

    private String createdAt;
    private List<ProductImportReqDTO> products;

    @Override
    public String toString() {
        return "ImportProductReqDTO{" +
                "createdAt=" + createdAt +
                ", products=" + products.toString() +
                '}';
    }


}
