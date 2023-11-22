package com.cg.service.productImportService;

import com.cg.exception.DataInputException;
import com.cg.model.Product;
import com.cg.model.ProductImport;
import com.cg.model.ProductImportDetail;
import com.cg.model.dto.ImportProductReqDTO;
import com.cg.model.dto.ProductImportListResDTO;
import com.cg.model.dto.ProductImportReqDTO;
import com.cg.repository.ProductImportDetailRepository;
import com.cg.repository.ProductImportRepository;
import com.cg.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductImportServiceImpl implements IProductImportService {

    @Autowired
    private ProductImportRepository productImportRepository;

    @Autowired
    private ProductImportDetailRepository productImportDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductImport> findAll() {
        return null;
    }

    @Override
    public Optional<ProductImport> findById(Long id) {
        return Optional.empty();
    }



    @Override
    public void save(ProductImport productImport) {

    }

    @Override
    public void update(ProductImport productImport) {

    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public List<ProductImportListResDTO> findAllProductImportResDTO() {
        return productImportRepository.findAllProductImportResDTO();
    }

    @Override
    public void create(ImportProductReqDTO importProductReqDTO) {
        ProductImport productImport = new ProductImport();
        productImport.setCreatedAt(LocalDateTime.parse(importProductReqDTO.getCreatedAt()));

        productImportRepository.save(productImport);

        for(ProductImportReqDTO pro : importProductReqDTO.getProducts()){
            ProductImportDetail productImportDetail = new ProductImportDetail();
            productImportDetail.setProductImport(productImport);

            Product product = productRepository.findById(pro.getProductId()).orElseThrow(() ->
                    new DataInputException("Product not found"));

            productImportDetail.setProduct(product);
            productImportDetail.setQuantity(pro.getQuantity());

            productImportDetailRepository.save(productImportDetail);
        }

    }

}
