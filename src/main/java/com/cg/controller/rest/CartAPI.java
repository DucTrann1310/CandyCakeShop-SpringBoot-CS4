package com.cg.controller.rest;

import com.cg.exception.DataInputException;
import com.cg.model.Cart;
import com.cg.model.dto.CartResDTO;
import com.cg.repository.CartRepository;
import com.cg.service.cartService.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.time.ZoneId;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartAPI {

    @Autowired
    private ICartService cartService;

    @Autowired
    private CartRepository cartRepository;


    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCartByIdCustomer(@PathVariable Long customerId) {
        Cart cart = cartService.findById(customerId).orElseThrow(() ->
                new DataInputException("Product not found"));

        CartResDTO cartResDTO = cart.toCartResDTO();

        return new ResponseEntity<>(cartResDTO, HttpStatus.OK);
    }


    @GetMapping("/cart/{year}/{month}")
    public Double getTotalCartByMonth(@PathVariable int year, @PathVariable int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        Date startDate = Date.from(yearMonth.atDay(1).atStartOfDay().toInstant());
        Date endDate = Date.from(yearMonth.atEndOfMonth().atStartOfDay().toInstant());
//        Date startDate = Date.from(yearMonth.atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
//        Date endDate = Date.from(yearMonth.atEndOfMonth().atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Cart> carts = cartRepository.findByDate(startDate, endDate);
        return carts.stream().mapToDouble(Cart::getPrice).sum();

    }
}

