package com.cg.controller;



import com.cg.model.User;
import com.cg.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping(value="/")
@AllArgsConstructor
public class HomeController {
    private final UserService userService;
    private final ModelAndView modelAndView = new ModelAndView();

    @GetMapping("/home")
    public ModelAndView showHome() {
        modelAndView.setViewName("home/index");
        modelAndView.addObject("someKey", "someValue");
        return modelAndView;
    }
    
    @GetMapping("/productDetail")
    public ModelAndView showProductDetail() {
        modelAndView.setViewName("home/productDetail");
        modelAndView.addObject("someKey", "someValue");
        return modelAndView;
    }
    @GetMapping("/user")
    public ModelAndView showUser() {
        modelAndView.setViewName("user/index");
        modelAndView.addObject("someKey", "someValue");
        ModelAndView modelAndView = Login();
        return modelAndView;
    }

    @GetMapping("/products")
    public ModelAndView showProduct() {
        modelAndView.setViewName("product/index");
        ModelAndView modelAndView = Login();
        modelAndView.addObject("someKey", "someValue");

        return modelAndView;
    }

    public ModelAndView Login(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();

            Optional<User> user = userService.findByNameIgnoreCaseOrPhone(username);

            if (user.isPresent()) {
                modelAndView.addObject("loggedIn", true);
                modelAndView.addObject("user", user.get());
            } else {
                modelAndView.addObject("loggedIn", false);
            }
        } else {
            modelAndView.addObject("loggedIn", false);
        }

        return modelAndView;
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {

        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());

        return "redirect:/auth";
    }


}
