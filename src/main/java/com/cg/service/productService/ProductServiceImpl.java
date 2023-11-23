
package com.cg.service.productService;

import com.cg.model.Product;
import com.cg.model.dto.ProductResDTO;
import com.cg.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements IProductService{

    @Autowired
    private ProductRepository productRepository;

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
//        return null;
    }
}
