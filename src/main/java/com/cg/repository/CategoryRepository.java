<<<<<<< Updated upstream
package com.cg.repository;public interface CategoryRepository {
=======
package com.cg.repository;

import com.cg.model.Category;
import com.cg.model.dto.CategoryResDTO;
import com.cg.model.dto.ProductResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT  NEW com.cg.model.dto.CategoryResDTO ( " +
            "c.id, " +
            "c.name " +
            ")" +
            "FROM Category as c"
    )
    List<CategoryResDTO> findAllCategoriesResDTO();
>>>>>>> Stashed changes
}
