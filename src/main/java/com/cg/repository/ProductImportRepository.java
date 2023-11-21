package com.cg.repository;

import com.cg.model.ProductImport;
import com.cg.model.dto.ProductImportListResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImportRepository extends JpaRepository<ProductImport, Long> {

    @Query(value =
            "SELECT " +
                "pi.id, " +
                "pi.code, " +
                "pi.created_at AS createdAt, " +
                "GROUP_CONCAT(p.product_name) AS products, " +
                "pi.total " +
            "FROM product_imports pi " +
            "LEFT JOIN product_import_details pid " +
            "ON pi.id = pid.product_import_id " +
            "LEFT JOIN products p " +
            "ON p.id = pid.product_id " +
            "GROUP BY pi.id " +
            "ORDER BY pi.id",
            nativeQuery = true
    )
    List<ProductImportListResDTO> findAllProductImportResDTO();
}
