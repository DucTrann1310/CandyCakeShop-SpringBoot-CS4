package com.cg.service.productService.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProductSaveRequest {

    private String productName;

    private String price;

    private String description;

    private String quantitySold;


    private List<String> idCategories;

    private String avatar;
}
