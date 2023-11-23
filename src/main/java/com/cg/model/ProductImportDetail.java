package com.cg.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_import_details")
public class ProductImportDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private Long quantity;

    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @ManyToOne
    private Product product;

    @JoinColumn(name = "product_import_id", referencedColumnName = "id")
    @ManyToOne
    private ProductImport productImport;
}
