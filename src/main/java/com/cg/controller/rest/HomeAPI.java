package com.cg.controller.rest;

import com.cg.model.Product;
import com.cg.model.dto.ProductResDTO;
import com.cg.service.productService.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/home")
public class HomeAPI {
    @Autowired
    private IProductService productService;
    @GetMapping
    public ResponseEntity<?> showAll(){
        List<Product> products = productService.findAll();
        List<ProductResDTO> productResDTOs = products.stream()
                .map(product -> new ProductResDTO(
                        product.getId(),
                        product.getProductName(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getCategory()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(productResDTOs, HttpStatus.OK);
    }

    @GetMapping("{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId){
        Optional<Product> product = productService.findById(productId);
        ProductResDTO productResDTO = product.orElseThrow().toProductResDTO();
        return new ResponseEntity<>(productResDTO,HttpStatus.OK);
    }

//    @GetMapping("/productDetail/${idProductDetail}")
//    public ResponseEntity<?> showProductDetail(@PathVariable Long productId) {
//        Optional<Product> product = productService.findById(productId);
//        ProductResDTO productResDTO = product.orElseThrow().toProductResDTO();
//        return new ResponseEntity<>(productResDTO, HttpStatus.OK);
//    }
//    @PostMapping("/cart/{idCustomer}")
//    public ResponseEntity<?> addProToCart(@PathVariable Long idCustomer,@RequestBody CartDetailReqDTO cartDetailReqDTO){
//        Optional<Cart> cart = cartService.findByIdCustomer(idCustomer);
//
//        CartDetail cartDetail = cartDetailReqDTO.toCartDetail();
//
//        if (cart.isPresent()) {
//
//            cartDetail.setCart(cart.get());
//
//            if (cartService.existsByIdProduct(cartDetail.getProduct().getId()) > 0){
//
//                cartService.saveCartDetailIsExitWithProduct(cartDetail);
//            } else {
//
//                cartService.saveCartDetail(cartDetail);
//            }
//        } else {
//            Cart newCart = cartDetailReqDTO.toCart();
//
//            cartService.save(newCart);
//
//            cartDetail.setCart(newCart);
//
//            cartService.saveCartDetail(cartDetail);
//        }
//        return new ResponseEntity<>(cartDetailReqDTO,HttpStatus.OK);
//    }
//    @GetMapping("/cart/{idCustomer}")
//    public ResponseEntity<?> getCarts(@PathVariable Long idCustomer){
//
//        List<CartDetailResDTO> cartDetails = cartService.getAllByCustomer_Id(idCustomer);
//
//        return new ResponseEntity<>(cartDetails,HttpStatus.OK);
//    }
//
//    @GetMapping("delete/{idCartDetail}")
//    public ResponseEntity<?> deleteProductFromCart(@PathVariable Long idCartDetail){
//
//        cartService.deleteCartDetail(idCartDetail);
//
//        return new ResponseEntity<>("OK",HttpStatus.OK);
//    }
//    @GetMapping("/cartDetail/{idCustomer}")
//    public  ResponseEntity<?> getCountDetail(@PathVariable Long idCustomer){
//
//        Long countCartDetailByCustomer =  cartService.getCountDetail(idCustomer);
//
//        return new ResponseEntity<>(countCartDetailByCustomer,HttpStatus.OK);
//    }

}
