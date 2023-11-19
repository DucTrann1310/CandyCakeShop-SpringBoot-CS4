
package com.cg.controller.rest;

import com.cg.exception.DataInputException;
import com.cg.model.Product;
import com.cg.model.dto.ProductCreReqDTO;
import com.cg.model.dto.ProductResDTO;
import com.cg.model.dto.ProductUpReqDTO;
import com.cg.service.productService.IProductService;
import com.cg.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.DataInput;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductAPI {

    @Autowired
    private IProductService productService;

    @Autowired
    private AppUtils appUtils;

    @GetMapping
    public ResponseEntity<?> getAllProduct() {

        List<ProductResDTO> products = productService.findAllProductResDTO();

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {

        Product product = productService.findById(productId).orElseThrow(() ->
                new DataInputException("Product not found"));

        ProductResDTO productResDTO = product.toProductResDTO();

        return new ResponseEntity<>(productResDTO, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@RequestBody ProductCreReqDTO productCreReqDTO, BindingResult bindingResult) {

        new ProductCreReqDTO().validate(productCreReqDTO, bindingResult);

        if (bindingResult.hasFieldErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }

        Product product = productCreReqDTO.toProduct();
        productService.save(product);

        return new ResponseEntity<>(product.toProductResDTO(), HttpStatus.CREATED);
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<?> updateProductById(@PathVariable Long productId, @RequestBody ProductUpReqDTO productUpReqDTO, BindingResult bindingResult) {


        Product product = productService.findById(productId).orElseThrow(() ->
                new DataInputException("Product not found"));

        new ProductUpReqDTO().validate(productUpReqDTO, bindingResult);

        if (bindingResult.hasFieldErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }

        Product productUpdate = productUpReqDTO.toProduct(productId);
        productService.save(productUpdate);

        return new ResponseEntity<>(productUpdate.toProductResDTO(), HttpStatus.OK);
    }


}
