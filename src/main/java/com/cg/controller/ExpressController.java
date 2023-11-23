package com.cg.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/express")
public class ExpressController {

    @GetMapping()
    public String getAll() {

        return "express/index";
    }
}
