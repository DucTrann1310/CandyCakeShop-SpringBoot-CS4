
package com.cg.model.dto;

import com.cg.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductResDTO {


    private Long id;

    private String name;

    private BigDecimal price;

//    private String img;

    private String description;

    private CategoryResDTO category;

    public ProductResDTO(Long id, String name, BigDecimal price, String description, Category category){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category.toCategoryResDTO();
    }

}
