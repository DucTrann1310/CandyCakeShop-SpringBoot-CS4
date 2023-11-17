<<<<<<< Updated upstream
package com.cg.controller.rest;public class ProductAPI {
=======
package com.cg.controller.rest;

import com.cg.model.dto.ProductResDTO;
import com.cg.service.productService.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductAPI {

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProduct(){

        List<ProductResDTO> products = productService.findAllProductResDTO();

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

//    @PostMapping()

>>>>>>> Stashed changes
}
