package com.cg.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductImportCreReqDTO {

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
