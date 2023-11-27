package com.cg.controller.rest;



import com.cg.model.ProductImage;
import com.cg.service.productImageService.ProductImageService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("api/upload")
@AllArgsConstructor
public class UploadAvatarAPI {
    private final ProductImageService productImageService;

    @PostMapping
    public ProductImage upload(@RequestParam("avatar")MultipartFile avatar) throws IOException {
        return productImageService.saveAvatar(avatar);
    }

    @DeleteMapping
    public void delete(@RequestParam("url") String url) {
        productImageService.delete(url);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable String id) {
        productImageService.deleteById(id);
    }


}
