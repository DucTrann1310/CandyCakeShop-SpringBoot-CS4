package com.cg.service.productService.response;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponse {
    private Long id;

    private String productName;

    private BigDecimal price;

    private String description;

    private Long quantitySold;

    private String roomCategory;

    private List<String> images;
}
