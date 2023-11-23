package com.cg.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductImportReqDTO {
    private Long productId;
    private Long quantity;

    @Override
    public String toString() {
        return "ProductImportReqDTO{" +
                "productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
