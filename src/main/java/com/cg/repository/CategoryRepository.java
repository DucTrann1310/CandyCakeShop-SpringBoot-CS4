
package com.cg.repository;

import com.cg.model.Category;
import com.cg.model.dto.CategoryResDTO;
import com.cg.model.dto.ProductResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT  NEW com.cg.model.dto.CategoryResDTO ( " +
            "c.id, " +
            "c.categoryName " +
            ")" +
            "FROM Category as c"
    )
    List<CategoryResDTO> findAllCategoriesResDTO();

}
