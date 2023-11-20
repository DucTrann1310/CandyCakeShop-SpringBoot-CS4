package com.cg.model.dto;

import com.cg.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CategoryCreReqDTO {

    private Long id;

    private String categoryName;

    public Category toCategory() {
        return new Category()
                .setId(id)
                .setCategoryName(categoryName);
    }
}
