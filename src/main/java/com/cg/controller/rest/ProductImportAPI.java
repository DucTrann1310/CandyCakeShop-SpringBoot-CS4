package com.cg.controller.rest;

import com.cg.model.dto.*;
import com.cg.service.productImportService.IProductImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/product-imports")
public class ProductImportAPI {

    @Autowired
    private IProductImportService productImportService;

    @GetMapping()
    public ResponseEntity<?> getAllProductImports() {

        List<ProductImportResDTO> productImportList = productImportService.findAllProductImportResDTO();

        return new ResponseEntity<>(productImportList, HttpStatus.OK);
    }

    @GetMapping("/{productImportId}")
    public ResponseEntity<?> getProductImportById(@PathVariable Long productImportId) {

        List<ProductImportDetailResDTO> productImportDetailList = productImportService.findProductImportDetailUpReqDTOByProductImportId(productImportId);

        ImportProductResDTO importProductResDTO = productImportService.findImportProductUpReqDTOByProductImportId(productImportId);
        importProductResDTO.setProductImportDetailResDTOS(productImportDetailList);

        return new ResponseEntity<>(importProductResDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProductImport(@RequestBody ImportProductCreReqDTO importProductCreReqDTO) {

        productImportService.create(importProductCreReqDTO);

        ProductImportResDTO productImportListResDTO = productImportService.findProductImportResDTOByMaxId();

        return new ResponseEntity<>(productImportListResDTO, HttpStatus.OK);
    }

    @PostMapping("/{productImportId}")
    public ResponseEntity<?> confirmProductImport(@PathVariable Long productImportId) {


        productImportService.confirm(productImportId);

        ProductImportResDTO productImportResDTO = productImportService.findProductImportResDTOByProductImportId(productImportId);


        return new ResponseEntity<>(productImportResDTO, HttpStatus.OK);
    }

    @PostMapping("/cancel/{productImportId}")
    public ResponseEntity<?> cancelProductImport(@PathVariable Long productImportId){

        productImportService.cancel(productImportId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
