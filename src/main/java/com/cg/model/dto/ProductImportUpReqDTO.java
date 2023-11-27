package com.cg.model.dto;

import com.cg.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductImportUpReqDTO {

    private Long productId;

    private Long quantity;

    @Override
    public String toString() {
        return "ProductImportUpReqDTO{" +
                "productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
