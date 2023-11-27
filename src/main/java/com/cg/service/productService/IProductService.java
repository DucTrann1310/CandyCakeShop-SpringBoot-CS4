
package com.cg.service.productService;

import com.cg.model.Product;
import com.cg.model.dto.ProductResDTO;
import com.cg.service.IGeneralService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductService extends IGeneralService<Product, Long> {

    List<ProductResDTO> findAllProductResDTO();


}
