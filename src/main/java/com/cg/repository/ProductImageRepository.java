package com.cg.repository;

import com.cg.model.ProductImage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    @Transactional
    void deleteProductImageByFileUrl(String fileUrl);
}
