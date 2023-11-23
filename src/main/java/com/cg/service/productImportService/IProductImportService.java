package com.cg.service.productImportService;

import com.cg.model.ProductImport;
import com.cg.model.dto.*;
import com.cg.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductImportService extends IGeneralService<ProductImport, Long> {

    List<ProductImportResDTO> findAllProductImportResDTO();

    void create(ImportProductCreReqDTO importProductReqDTO);

    List<ProductImportDetailResDTO> findProductImportDetailUpReqDTOByProductImportId(Long product_import_id);

    ImportProductResDTO findImportProductUpReqDTOByProductImportId(Long product_import_id);

    ProductImportResDTO findProductImportResDTOByMaxId();

    void confirm(Long productImportId, ImportProductUpReqDTO importProductUpReqDTO);

    ProductImportResDTO findProductImportResDTOByProducImportId(Long product_import_id);
}
