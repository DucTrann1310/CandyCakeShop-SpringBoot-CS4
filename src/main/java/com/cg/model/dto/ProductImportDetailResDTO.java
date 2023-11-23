package com.cg.model.dto;


import com.cg.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductImportDetailResDTO {


    private ProductResDTO product;

    private Long quantity;

    public ProductImportDetailResDTO(Product product, Long quantity){
        this.product = product.toProductResDTO();
        this.quantity = quantity;
    }

}
