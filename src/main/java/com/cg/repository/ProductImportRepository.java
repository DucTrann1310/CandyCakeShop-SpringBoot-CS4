package com.cg.repository;

import com.cg.model.ProductImport;
import com.cg.model.dto.ImportProductResDTO;
import com.cg.model.dto.ProductImportDetailResDTO;
import com.cg.model.dto.ProductImportResDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImportRepository extends JpaRepository<ProductImport, Long> {

    @Query(value =
            "SELECT " +
                "pi.id, " +
                "pi.import_date AS importDate," +
                "GROUP_CONCAT(p.product_name) AS products," +
                "pi.confirm as confirm " +
            "FROM product_imports pi " +
            "LEFT JOIN product_import_details pid " +
            "ON pi.id = pid.product_import_id " +
            "LEFT JOIN products p " +
            "ON p.id = pid.product_id " +
            "GROUP BY pi.id " +
            "ORDER BY pi.created_at",
            nativeQuery = true
    )
    List<ProductImportResDTO> findAllProductImportResDTO();

    @Query("SELECT new com.cg.model.dto.ProductImportDetailResDTO (" +
            "pid.product, " +
            "pid.quantity " +
            ") " +
            "FROM ProductImportDetail as pid " +
            "WHERE pid.productImport.id = :product_import_id"
    )
    List<ProductImportDetailResDTO> findProductImportDetailUpReqDTOByProductImportId(@Param("product_import_id") Long product_import_id);

    @Query("SELECT new com.cg.model.dto.ImportProductResDTO ( " +
            "pi.id, " +
            "pi.importDate, " +
            "pi.confirm  " +
            ") " +
            "FROM ProductImport as pi " +
            "WHERE pi.id = :product_import_id"
    )
    ImportProductResDTO findImportProductUpReqDTOByProductImportId(@Param("product_import_id") Long product_import_id);


    @Query(value =
            "SELECT " +
                    "pi.id, " +
                    "pi.import_date AS importDate," +
                    "GROUP_CONCAT(p.product_name) AS products," +
                    "pi.confirm as confirm " +
            "FROM product_imports pi " +
            "LEFT JOIN product_import_details pid " +
            "ON pi.id = pid.product_import_id " +
            "LEFT JOIN products p " +
            "ON p.id = pid.product_id " +
            "GROUP BY pi.id " +
            "HAVING pi.id = (" +
                            "SELECT " +
                            "Max(id) " +
                            "FROM product_imports" +
                            ")",
            nativeQuery = true
    )
    ProductImportResDTO findProductImportResDTOByMaxId();

    @Query(value =
            "SELECT " +
                    "pi.id, " +
                    "pi.import_date AS importDate," +
                    "GROUP_CONCAT(p.product_name) AS products," +
                    "pi.confirm as confirm " +
            "FROM product_imports pi " +
            "LEFT JOIN product_import_details pid " +
            "ON pi.id = pid.product_import_id " +
            "LEFT JOIN products p " +
            "ON p.id = pid.product_id " +
            "WHERE pi.id = :product_import_id " +
            "GROUP BY pi.id ",
            nativeQuery = true
    )
    ProductImportResDTO findProductImportResDTOByProductImportId(@Param("product_import_id") Long product_import_id);
}
