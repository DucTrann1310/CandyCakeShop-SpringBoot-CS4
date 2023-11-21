package com.cg.service.productImportService;

import com.cg.model.ProductImport;
import com.cg.model.dto.ProductImportListResDTO;
import com.cg.repository.ProductImportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductImportServiceImpl implements IProductImportService {

    @Autowired
    private ProductImportRepository productImportRepository;

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
}
