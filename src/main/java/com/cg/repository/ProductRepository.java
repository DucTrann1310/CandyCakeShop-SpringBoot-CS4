
package com.cg.repository;

import com.cg.model.Product;
import com.cg.model.dto.ProductImportListResDTO;
import com.cg.model.dto.ProductResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT  NEW com.cg.model.dto.ProductResDTO ( " +
            "p.id, " +
            "p.productName, " +
            "p.price, " +
            "p.description," +
            "p.category " +
            ")" +
            "FROM Product as p " +
            "ORDER BY p.id ASC "
    )
    List<ProductResDTO> findAllProductResDTO();

}
