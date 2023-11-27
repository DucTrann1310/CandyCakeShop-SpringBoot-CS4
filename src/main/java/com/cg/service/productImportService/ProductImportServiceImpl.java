package com.cg.service.productImportService;

import com.cg.exception.DataInputException;
import com.cg.model.Product;
import com.cg.model.ProductImport;
import com.cg.model.ProductImportDetail;
import com.cg.model.dto.*;
import com.cg.repository.ProductImportDetailRepository;
import com.cg.repository.ProductImportRepository;
import com.cg.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.sql.Date;
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
        return productImportRepository.findById(id);
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
    public List<ProductImportResDTO> findAllProductImportResDTO() {
        return productImportRepository.findAllProductImportResDTO();
    }

    @Override
    public void create(ImportProductCreReqDTO importProductReqDTO) {
        ProductImport productImport = new ProductImport();
        productImport.setImportDate(Date.valueOf(importProductReqDTO.getImportDate()));

        productImportRepository.save(productImport);

        for(ProductImportCreReqDTO pro : importProductReqDTO.getProducts()){
            ProductImportDetail productImportDetail = new ProductImportDetail();
            productImportDetail.setProductImport(productImport);

            Product product = productRepository.findById(pro.getProductId()).orElseThrow(() ->
                    new DataInputException("Product not found"));

            productImportDetail.setProduct(product);
            productImportDetail.setQuantity(pro.getQuantity());

            productImportDetailRepository.save(productImportDetail);
        }

    }

    @Override
    public void confirm(Long productImportId) {
        ProductImport productImport = productImportRepository.findById(productImportId).get();
        productImport.setConfirm(true);

        productImportRepository.save(productImport);
    }

    @Override
    public ProductImportResDTO findProductImportResDTOByProductImportId(Long product_import_id) {
        return productImportRepository.findProductImportResDTOByProductImportId(product_import_id);
    }

    @Override
    public void cancel(Long productImportId) {

        productImportDetailRepository.deleteProductImportDetailsByProductImportId(productImportId);

        productImportRepository.deleteById(productImportId);


    }

    @Override
    public List<ProductImportDetailResDTO> findProductImportDetailUpReqDTOByProductImportId(Long product_import_id) {
        return productImportRepository.findProductImportDetailUpReqDTOByProductImportId(product_import_id);
    }

    @Override
    public ImportProductResDTO findImportProductUpReqDTOByProductImportId(Long product_import_id) {
        return productImportRepository.findImportProductUpReqDTOByProductImportId(product_import_id);
    }

    @Override
    public ProductImportResDTO findProductImportResDTOByMaxId() {
        return productImportRepository.findProductImportResDTOByMaxId();
    }




}
