package com.cg.service.productImportService;

import com.cg.model.ProductImport;
import com.cg.model.dto.ImportProductReqDTO;
import com.cg.model.dto.ProductImportListResDTO;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IProductImportService extends IGeneralService<ProductImport, Long> {

    List<ProductImportListResDTO> findAllProductImportResDTO();

    void create(ImportProductReqDTO importProductReqDTO);
}
