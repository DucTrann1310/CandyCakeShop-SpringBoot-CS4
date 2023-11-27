package com.cg.service.productImportDetailService;

import com.cg.model.ProductImportDetail;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IProductImportDetailService extends IGeneralService<ProductImportDetail, Long> {

    void deleteProductImportDetailsByProductImportId(Long productImport_id);

    List<ProductImportDetail> findProductImportDetailsByProductImportId(Long productImport_id);

}
