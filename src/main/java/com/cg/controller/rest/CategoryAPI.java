<<<<<<< Updated upstream
package com.cg.controller.rest;public class CategoryAPI {
=======
package com.cg.controller.rest;

import com.cg.model.dto.CategoryResDTO;
import com.cg.service.categoryService.ICategoryService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryAPI {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping()
    public ResponseEntity<?> getAllCategories(){
        List<CategoryResDTO> categories = categoryService.findAllCategoriesResDTO();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
>>>>>>> Stashed changes
}
