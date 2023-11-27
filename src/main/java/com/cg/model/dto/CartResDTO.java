package com.cg.model.dto;

import com.cg.model.Product;
import com.cg.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class CartResDTO {
    private Long id;
    private ProductResDTO product;
    private User customer;
    private int quantity;
    private BigDecimal price;

    public CartResDTO(Long id, Product product, User customer, int quantity, BigDecimal price) {
        this.id = id;
        this.product = product.toProductResDTO();
        this.customer = customer;
        this.quantity = quantity;
        this.price = price;
    }
}
