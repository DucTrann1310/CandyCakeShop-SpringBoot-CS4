
package com.cg.controller;


import com.cg.service.productService.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class    ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping()
    public String getAllProduct(){

//        model.addAttribute("products", productService.findAll());

        return "product/index";
    }

}
