package com.cg.controller.rest;

import com.cg.model.dto.ProductImportListResDTO;
import com.cg.service.productImportService.IProductImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-imports")
public class ProductImportAPI {

    @Autowired
    private IProductImportService productImportService;

    @GetMapping()
    public ResponseEntity<?> getAllProductImports() {

        List<ProductImportListResDTO> productImportList = productImportService.findAllProductImportResDTO();

        return new ResponseEntity<>(productImportList, HttpStatus.OK);
    }
}
