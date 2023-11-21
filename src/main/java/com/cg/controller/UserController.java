package com.cg.controller;

import com.cg.service.productService.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/user")
public class UserController {


    @Autowired
    private IProductService productService;

    @GetMapping()
    public String getAll() {

        return "user/index";
    }
}
