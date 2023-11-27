package com.cg.model;

import com.cg.model.dto.CartResDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "carts")
@Accessors(chain = true)
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private User customer;
    private int quantity;
    private BigDecimal price;

    public CartResDTO toCartResDTO() {
        return new CartResDTO()
                .setId(id)
                .setProduct(product.toProductResDTO())
                .setCustomer(customer)
                .setQuantity(quantity)
                .setPrice(price);
    }
}
