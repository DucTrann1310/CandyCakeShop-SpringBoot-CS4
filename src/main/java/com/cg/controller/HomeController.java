package com.cg.controller;

import com.cg.service.productService.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/home")
@AllArgsConstructor
public class HomeController {
//    private final UserService userService;

    @GetMapping
    public String showHome() {
        return "/home/index";
    }

    @GetMapping("/productDetail")
    public String showProductDetail() {
        return "/home/productDetail";
    }

//    @GetMapping("/shop")
//    public String showShop() {
//        return "shop";
//    }
//
//    @GetMapping("/cart")
//    public String showCart() {
//        return "cart";
//    }
//
//    @GetMapping("/detail")
//    public String showDetail() {
//        return "detail";
//    }
//
//    private final ModelAndView modelAndView = new ModelAndView();
//
//    @GetMapping("/")
//    public ModelAndView getHome() {
//        modelAndView.setViewName("index");
////        ModelAndView modelAndView = Login();
//        modelAndView.addObject("someKey", "someValue");
//        return modelAndView;
//    }
//
//    @GetMapping("/price")
//    public ModelAndView price() {
//        modelAndView.setViewName("price");
////        ModelAndView modelAndView = Login();
//        modelAndView.addObject("someKey", "someValue");
//        return modelAndView;
//    }
//
//    @GetMapping("/contact")
//    public String showContact() {
//        return "/home/contact";
//    }
//
//    @GetMapping("/checkout")
//    public String showCheckout() {
//        return "/home/checkout";
//    }
//
//    @GetMapping("/login")
//    public String showLogin() {
//        return "login/login";
//    }
}
