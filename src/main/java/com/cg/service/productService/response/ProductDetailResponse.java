package com.cg.service.productService.response;


import com.cg.service.UploadService.response.ImageResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ProductDetailResponse {
    private Long id;
    private String productName;
    private BigDecimal price;
    private String description;
    private Long quantitySold;
    private List<Long> categoryIds;
    private ImageResponse image;
}
