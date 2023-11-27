
package com.cg.service.productService;

import com.cg.model.Product;
import com.cg.model.ProductImage;
import com.cg.model.dto.ProductResDTO;
import com.cg.repository.ProductImageRepository;
import com.cg.repository.ProductRepository;
import com.cg.service.UploadService.UploadService;
import com.cg.service.UploadService.response.ImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
@Transactional
public class ProductServiceImpl implements IProductService{


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productAvatarRepository;


    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void update(Product product) {

    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public List<ProductResDTO> findAllProductResDTO() {
        return productRepository.findAllProductResDTO();
    }

}
