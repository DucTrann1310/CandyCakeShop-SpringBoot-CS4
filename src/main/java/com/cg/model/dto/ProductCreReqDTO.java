package com.cg.model.dto;

import com.cg.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductCreReqDTO implements Validator {

    private String productName;

    private CategoryCreReqDTO categoryCreReqDTO;

    private String price;

    private String description;

    private String avatar;


    public Product toProduct() {
        return new Product()
                .setProductName(productName)
                .setCategory(categoryCreReqDTO.toCategory())
                .setPrice(BigDecimal.valueOf(Long.parseLong(price)))
                .setDescription(description)
                ;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object o, Errors errors) {
        ProductCreReqDTO productCreReqDTO = (ProductCreReqDTO) o;

        String productName = productCreReqDTO.productName;

        String price = productCreReqDTO.price;

        if (productName.length() < 5) {
            errors.rejectValue("productName", "productName.length", "Tên sản phẩm phải chứa ít nhất 5 kí tự");
        }

        try {
            BigDecimal priceBigDecimal = new BigDecimal(price);
            if (priceBigDecimal.compareTo(BigDecimal.valueOf(1000)) < 0) {
                errors.rejectValue("price", "price.invalid", "Giá sản phẩm phải ít nhất là 1000");
            }
        } catch (NumberFormatException e) {
            errors.rejectValue("price", "price.invalid", "Giá sản phẩm phải là một số");
        }
    }
}
