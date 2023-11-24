package com.cg.repository;

import com.cg.model.ProductImportDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImportDetailRepository extends JpaRepository<ProductImportDetail, Long> {

    void deleteProductImportDetailsByProductImportId(Long productImport_id);

    List<ProductImportDetail> findProductImportDetailsByProductImportId(Long productImport_id);
}
