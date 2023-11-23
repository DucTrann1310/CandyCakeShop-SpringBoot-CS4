package com.cg.repository;

import com.cg.model.ProductImportDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImportDetailRepository extends JpaRepository<ProductImportDetail, Long> {
}
