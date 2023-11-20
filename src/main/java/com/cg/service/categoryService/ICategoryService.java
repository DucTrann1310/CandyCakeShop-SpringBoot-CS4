
package com.cg.service.categoryService;

import com.cg.model.Category;
import com.cg.model.dto.CategoryResDTO;
import com.cg.service.IGeneralService;

import java.util.List;

public interface ICategoryService extends IGeneralService<Category, Long> {

    List<CategoryResDTO> findAllCategoriesResDTO();

}
