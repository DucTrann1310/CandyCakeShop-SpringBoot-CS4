package com.cg.controller.rest;

import com.cg.exception.DataInputException;
import com.cg.model.Cart;
import com.cg.model.dto.CartResDTO;
import com.cg.service.cartService.ICartService;
import com.cg.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartAPI {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private ICartService cartService;

    @Autowired
    private AppUtils appUtils;

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCartByIdCustomer(@PathVariable Long customerId) {
        Cart cart = cartService.findById(customerId).orElseThrow(() ->
                new DataInputException("Product not found"));

        CartResDTO cartResDTO = cart.toCartResDTO();

        return new ResponseEntity<>(cartResDTO, HttpStatus.OK);
    }

//    @PostMapping()
//    public ResponseEntity<?> addToCart() {
//
//    }
}
