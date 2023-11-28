package com.cg.model;

import com.cg.model.dto.ProductResDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import jakarta.persistence.*;
import java.math.BigDecimal;
<<<<<<< Updated upstream
import java.util.List;
=======
>>>>>>> Stashed changes

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
@Accessors(chain = true)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name")
    private String productName;

    private BigDecimal price;

    //    private String img;

    private String description;

    @Column(name = "quantity_sold")
    private Long quantitySold;


    @OneToMany(mappedBy = "product")
    private List<ProductImage> images;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    public ProductResDTO toProductResDTO() {
        return new ProductResDTO()
                .setId(id)
                .setProductName(productName)
                .setCategory(category.toCategoryResDTO())
                .setPrice(price)
                .setDescription(description);
    }
}
