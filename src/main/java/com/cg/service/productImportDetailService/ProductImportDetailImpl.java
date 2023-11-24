package com.cg.service.productImportDetailService;

import com.cg.model.ProductImportDetail;
import com.cg.repository.ProductImportDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductImportDetailImpl implements IProductImportDetailService{

    @Autowired
    private ProductImportDetailRepository productImportDetailRepository;
    @Override
    public List<ProductImportDetail> findAll() {
        return productImportDetailRepository.findAll();
    }

    @Override
    public Optional<ProductImportDetail> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(ProductImportDetail productImportDetail) {

    }

    @Override
    public void update(ProductImportDetail productImportDetail) {

    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void deleteProductImportDetailsByProductImportId(Long productImport_id) {
        productImportDetailRepository.deleteProductImportDetailsByProductImportId(productImport_id);
    }

    @Override
    public List<ProductImportDetail> findProductImportDetailsByProductImportId(Long productImport_id) {
        return productImportDetailRepository.findProductImportDetailsByProductImportId(productImport_id);
    }
}
